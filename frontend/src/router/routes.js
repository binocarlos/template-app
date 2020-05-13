import authSelectors from 'store/selectors/auth'

const auth = {
  user: store => authSelectors.data(store.getState()) ? null : 'login',
  guest: store => authSelectors.data(store.getState()) ? 'home' : null,
}

const routes = [
  {
    name: 'home',
    path: '/',
    auth: auth.user,
  },
  {
    name: 'login',
    path: '/login',
    auth: auth.guest,
  },
  {
    name: 'register',
    path: '/register',
    auth: auth.guest,
  },
  {
    name: 'help',
    path: '/help',
  },
  {
    name: 'notfound',
    path: '/notfound',
  },
]


export default routes