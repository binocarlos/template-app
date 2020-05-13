import Promise from 'bluebird'
import CreateReducer from '../utils/createReducer'
import CreateActions from '../utils/createActions'

import {
  setToken,
  unsetToken,
  handlers,
} from '../utils/api'

import networkWrapper from '../utils/networkWrapper'
import routerActions from './router'

import {
  REFRESH_TOKEN_DELAY,
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

//localStorage.setItem('token', token)

let refreshTokenLoop = null

const sideEffects = {

  authenticate: (token) => async (dispatch, getState) => {
    let user
    try {
      if(!token) {
        token = localStorage.getItem('token')
      }
      if(token) {
        localStorage.setItem('token', token)
        setToken(token)
        user = await handlers.get('/auth/status')
        if(user) {
          dispatch(actions.startTokenLoop())
        }
      }
    } catch(e) {
      localStorage.setItem('token', '')
      unsetToken()
    }
    dispatch(actions.setUser(user))
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

  refreshToken: () => (dispatch, getState) => {
    console.log('refresh token')
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
    dispatch(routerActions.navigateTo('home'))
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
    dispatch(routerActions.navigateTo('home'))
  }),

  logout:() => wrapper('logout', async (dispatch, getState) => {
    localStorage.setItem('token', '')
    unsetToken()
    dispatch(actions.setUser(null))
    dispatch(routerActions.navigateTo('login'))
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