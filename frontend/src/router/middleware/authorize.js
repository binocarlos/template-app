import transitionPath from 'router5-transition-path'
import findRoutes from '../utils/findRoutes'

import snackbarActions from 'store/modules/snackbar'
import routerActions from 'store/modules/router'
import authSelectors from 'store/selectors/auth'

const AUTH_HANDLERS = {
  user: (store) => {
    const user = authSelectors.data(store.getState())
    return user ?
      null :
      'login'
  },
  guest: (store) => {
    const user = authSelectors.data(store.getState())
    return user ?
      'home' :
      null
  },
}
/*

  run an authorize function on the route if present

  if the function returns a string - redirect there
  otherwise allow the route

*/
const authorizeRoute = (routes) => (router, dependencies) => (toState, fromState, done) => {
  const { toActivate } = transitionPath(toState, fromState)
  const { store } = dependencies

  const routeError = (message) => {
    console.error(message)
    store.dispatch(snackbarActions.setError(message))
  }

  const authorizeHandlers = findRoutes(routes, toActivate)
    .map(route => route.auth)
    .filter(auth => auth)

  // there are no authorize settings on this route
  if(authorizeHandlers.length <= 0) return done()
  // check there is only a single auth requirement
  if(authorizeHandlers.length > 1) {
    routeError(`multiple authorize settings found in route`)
    return
  }

  const authorizeHandler = typeof(authorizeHandlers[0] == 'string') ?
    AUTH_HANDLERS[authorizeHandlers[0]] :
    authorizeHandlers[0]

  if(!authorizeHandler) return done()

  const redirectTo = authorizeHandler(store)

  if(!redirectTo) {
    done()
  }
  else {
    store.dispatch(routerActions.navigateTo(redirectTo))
  }
}

export default authorizeRoute