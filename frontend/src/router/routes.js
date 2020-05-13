import authSelectors from 'store/selectors/auth'
import bookingFormActions from 'store/modules/bookingforms'

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
    children: [
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
        name: 'dashboard',
        path: '/dashboard',
        auth: auth.user,
      },
      {
        name: 'settings',
        path: '/settings',
        auth: auth.user,
      },
      {
        name: 'bookingforms',
        path: '/bookingforms',
        auth: auth.user,
        trigger: (store, params) => {
          store.dispatch(bookingFormActions.load())
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