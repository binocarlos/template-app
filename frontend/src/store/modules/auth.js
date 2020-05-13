import CreateReducer from '../utils/createReducer'
import CreateActions from '../utils/createActions'

import {
  setToken,
  unsetToken,
  handlers,
} from '../utils/api'

import {
  REFRESH_TOKEN_DELAY,
} from 'settings'

const prefix = 'snackbar'

const initialState = {
  loaded: false,
  data: null,
}

const reducers = {
  setUser: (state, action) => {
    state.loaded = true
    state.user = action.payload
  },
}

//localStorage.setItem('token', token)

let refreshTokenLoop = null

const sideEffects = {

  initialise: () => async (dispatch, getState) => {
    let user
    try {
      const token = localStorage.getItem('token')
      if(!token) {
        dispatch(actions.setUser(null))
        console.log('done auth')
        return
      }
      setToken(token)
      user = await handlers.get('/auth/status')
      dispatch(actions.startTokenLoop())
    } catch(e) {
      localStorage.setItem('token', '')
      unsetToken()
    }
    dispatch(actions.setUser(user))
  },

  startTokenLoop: () => (dispatch, getState) => {
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