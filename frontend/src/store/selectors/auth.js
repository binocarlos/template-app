import { networkGroup } from './utils'

const loaded = state => state.auth.loaded
const data = state => state.auth.data

const selectors = {
  loaded,
  data,
  ...networkGroup('auth', [
    'login',
    'register',
  ])
}

export default selectors
