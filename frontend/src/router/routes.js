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
  },
  {
    name: 'register',
    path: '/register',
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