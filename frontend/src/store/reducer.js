import { combineReducers } from 'redux'

import { reducer as router } from './modules/router'
import { reducer as snackbar } from './modules/snackbar'
import { reducer as network } from './modules/network'
import { reducer as auth } from './modules/auth'
import { reducer as fileupload } from './modules/fileupload'

const reducers = {
  router,
  snackbar,
  network,
  auth,
  fileupload,
}

export default combineReducers(reducers)
