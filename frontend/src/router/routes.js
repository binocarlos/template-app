import authSelectors from 'store/selectors/auth'
import itemActions from 'store/modules/item'

import {
  ROUTE_LOGGED_IN,
  ROUTE_LOGGED_OUT,
} from 'settings'

const auth = {
  user: store => authSelectors.data(store.getState()) ? null : ROUTE_LOGGED_OUT,
  guest: store => authSelectors.data(store.getState()) ? ROUTE_LOGGED_IN : null,
}

const routes = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'help',
    path: '/help',
  },
  {
    name: 'notfound',
    path: '/notfound',
  },
  {
    name: 'admin',
    path: '/admin',
    redirect: (state) => {
      const user = authSelectors.data(state)
      return user ?
        'admin.items' :
        'admin.login'
    },
    children: [
      {
        name: 'login',
        path: '/login',
        auth: auth.guest,
      },
      {
        name: 'logout',
        path: '/logout',
      },
      {
        name: 'register',
        path: '/register',
        auth: auth.guest,
      },
      {
        name: 'settings',
        path: '/settings',
        auth: auth.user,
      },
      {
        name: 'items',
        path: '/items',
        auth: auth.user,
        redirect: 'admin.items.list',
        trigger: async (store, params) => {
          await store.dispatch(itemActions.load())
        },
        children: [{
          name: 'list',
          path: '/list',
        }, {
          name: 'edit',
          path: '/edit/:id',
        }]
      },
    ]
  },
]


export default routes