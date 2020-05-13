import authActions from 'store/modules/auth'

export const REFRESH_TOKEN_DELAY = 1000 * 60
export const API = '/api/v1'

export const GUEST_MENU = [{
  title: 'Login',
  link: 'login',
}, {
  title: 'Register',
  link: 'register',
}, '-', {
  title: 'Help',
  link: 'help',
}]

export const USER_MENU = [{
  title: 'Home',
  link: 'home',
}, '-', {
  title: 'Logout',
  handler: (dispatch, getState) => {
    dispatch(authActions.logout())
  },
}, {
  title: 'Help',
  link: 'help',
}]

const settings = {
  API,
  GUEST_MENU,
  USER_MENU,
}

export default settings