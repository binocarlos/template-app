import authActions from 'store/modules/auth'

export const REFRESH_TOKEN_DELAY = 1000 * 60
export const API = '/api/v1'

export const ROUTE_LOGGED_IN = 'admin.dashboard'
export const ROUTE_LOGGED_OUT = 'admin.login'

export const ADMIN_USER_MENU = [{
  title: 'Home',
  link: 'admin.dashboard',
}, {
  title: 'Booking Forms',
  link: 'admin.bookingforms.list',
}, {
  title: 'Settings',
  link: 'admin.settings',
}, '-', {
  title: 'Logout',
  handler: (dispatch, getState) => {
    dispatch(authActions.logout())
  },
}, {
  title: 'Help',
  link: 'help',
}]

export const ADMIN_GUEST_MENU = [{
  title: 'Home',
  link: 'home',
}, {
  title: 'Login',
  link: 'admin.login',
}, {
  title: 'Register',
  link: 'admin.register',
}, '-', {
  title: 'Help',
  link: 'help',
}]

export const PUBLIC_MENU = [{
  title: 'Home',
  link: 'home',
}, {
  title: 'Help',
  link: 'help',
}, {
  title: 'Admin Panel',
  link: 'admin.login',
}]

const settings = {
  API,
  PUBLIC_MENU,
  ADMIN_GUEST_MENU,
  ADMIN_USER_MENU,
}

export default settings