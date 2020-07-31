import authActions from 'store/modules/auth'

export const REFRESH_TOKEN_DELAY = 1000 * 60
export const API = '/api/v1'

export const ROUTE_LOGGED_IN = 'items'
export const ROUTE_LOGGED_OUT = 'login'

export const USER_MENU = [{
  title: 'Home',
  link: 'items',
}, {
  title: 'Settings',
  link: 'settings',
}, '-', {
  title: 'Logout',
  handler: (dispatch, getState) => {
    dispatch(authActions.logout())
  },
}, {
  title: 'Help',
  link: 'help',
}]

export const GUEST_MENU = [{
  title: 'Home',
  link: 'home',
}, {
  title: 'Login',
  link: 'login',
}, '-', {
  title: 'Help',
  link: 'help',
}]

const settings = {
  API,
  USER_MENU,
  GUEST_MENU,
}

export default settings