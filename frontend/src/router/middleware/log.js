import transitionPath from 'router5-transition-path'
import findRoutes from '../utils/findRoutes'

// log each route transition in development
const logRoute = (routes) => (router, dependencies) => (toState, fromState, done) => {
  if(process.env.NODE_ENV !== 'development') return done()
  const { toActivate } = transitionPath(toState, fromState)
  const activeRoutes = findRoutes(routes, toActivate)
  console.log(`route:`, activeRoutes)
  done()
}

export default logRoute