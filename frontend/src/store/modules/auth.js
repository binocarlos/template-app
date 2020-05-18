import Promise from 'bluebird'
import CreateReducer from '../utils/createReducer'
import CreateActions from '../utils/createActions'

import {
  setHTTPToken,
  unsetHTTPToken,
  getHTTPTokenHeaders,
  handlers,
} from '../utils/api'

import networkWrapper from '../utils/networkWrapper'
import routerActions from './router'
import snackbarActions from './snackbar'

import {
  REFRESH_TOKEN_DELAY,
  ROUTE_LOGGED_IN,
  ROUTE_LOGGED_OUT,
} from 'settings'

const prefix = 'auth'
const wrapper = networkWrapper.factory(prefix)

const initialState = {
  loaded: false,
  data: null,
}

const reducers = {
  setUser: (state, action) => {
    state.loaded = true
    state.data = action.payload
  },
}

const setToken = (token) => {
  setHTTPToken(token)
  localStorage.setItem('token', token)
}

const unsetToken = () => {
  unsetHTTPToken()
  localStorage.setItem('token', '')
}

let refreshTokenLoop = null

const sideEffects = {

  authenticate: (token) => async (dispatch, getState) => {
    let user = null
    token = token || localStorage.getItem('token')
    if(token) {
      try {
        user = await handlers.get('/auth/status', null, {
          headers: getHTTPTokenHeaders(token),
        })
      } catch(e) {

      }
    }
    if(user && user.id) {
      setToken(token)
      dispatch(actions.startTokenLoop())
      dispatch(actions.setUser(user))
    }
    else {
      unsetToken()
      dispatch(actions.setUser(null))
    }
  },

  startTokenLoop: () => (dispatch, getState) => {
    clearInterval(refreshTokenLoop)
    refreshTokenLoop = setInterval(() => {
      dispatch(actions.refreshToken())
    }, REFRESH_TOKEN_DELAY)
  },

  stopTokenLoop: () => (dispatch, getState) => {
    clearInterval(refreshTokenLoop)
  },

  refreshToken: () => async (dispatch, getState) => {
    try {
      const { token } = await handlers.post('/auth/token')
      setToken(token)
    } catch(e) {
      unsetToken()
      dispatch(snackbarActions.setError(`you have been logged out`))
      dispatch(actions.logout())
    }
  },

  register: ({
    email,
    password,
  }) => wrapper('register', async (dispatch, getState) => {
    const {
      token,
    } = await handlers.post('/auth/register', {
      email,
      password,
    })
    await dispatch(actions.authenticate(token))
    dispatch(routerActions.navigateTo(ROUTE_LOGGED_IN))
  }),

  login: ({
    email,
    password,
  }) => wrapper('login', async (dispatch, getState) => {
    const {
      token,
    } = await handlers.post('/auth/login', {
      email,
      password,
    })
    await dispatch(actions.authenticate(token))
    dispatch(routerActions.navigateTo(ROUTE_LOGGED_IN))
  }),

  logout: () => wrapper('logout', async (dispatch, getState) => {
    unsetToken()
    dispatch(actions.setUser(null))
    dispatch(routerActions.navigateTo(ROUTE_LOGGED_OUT))
  }),

  updateSettings: ({
    payload,
  }) => wrapper('updateSettings', async (dispatch, getState) => {
    const result = await handlers.put('/auth/settings', payload)
    dispatch(actions.setUser(result))
    dispatch(snackbarActions.setSuccess(`settings updated`))
  }),
}

const reducer = CreateReducer({
  initialState,
  reducers,
  prefix,
})

const actions = CreateActions({
  reducers,
  sideEffects,
  prefix,
})

export { actions, reducer }
export default actions