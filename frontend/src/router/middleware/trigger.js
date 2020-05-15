import Promise from 'bluebird'
import transitionPath from 'router5-transition-path'
import findRoutes from '../utils/findRoutes'

/*

  trigger actions when routes become active

*/
const triggerRoute = (routes) => (router, dependencies) => async (toState, fromState, done) => {

  const { toActivate } = transitionPath(toState, fromState)
  const { store } = dependencies

  const activeRoutes = findRoutes(routes, toActivate)

  const allTriggers = activeRoutes.reduce((all, route) => {
    let triggers = route.trigger || []
    if(typeof(triggers) === 'function') triggers = [triggers]
    return all.concat(triggers)
  }, [])

  const params = toState.params

  await Promise.each(allTriggers, async trigger => {
    await trigger(store, params)
  })
}

export default triggerRoute