import { combineReducers } from 'redux'

import { reducer as router } from './modules/router'
import { reducer as snackbar } from './modules/snackbar'
import { reducer as network } from './modules/network'

const reducers = {
  router,
  snackbar,
  network,
}

export default combineReducers(reducers)
