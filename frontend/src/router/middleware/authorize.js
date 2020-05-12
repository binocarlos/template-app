import transitionPath from 'router5-transition-path'
import findRoutes from '../utils/findRoutes'

import snackbarActions from 'store/modules/snackbar'
import routerActions from 'store/modules/router'

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
    .map(route => route.authorize)
    .filter(authorize => authorize)

  // there are no authorize settings on this route
  if(authorizeHandlers.length <= 0) return done()
  // check there is only a single auth requirement
  if(authorizeHandlers.length > 1) {
    routeError(`multiple authorize settings found in route`)
    return
  }

  const authorizeHandler = authorizeHandlers[0]

  const redirectTo = authorizeHandler(store.getState())

  if(!redirectTo) {
    done()
  }
  else {
    store.dispatch(routerActions.navigateTo(redirectTo))
  }
}

export default authorizeRoute