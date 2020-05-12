import { 
  actions as coreActions,
  router5Reducer as reducer,
} from 'redux-router5'

import routerSelectors from '../selectors/router'

const sideEffects = {
  // set the query params wholesale
  setQueryParams: (params = {}) => (dispatch, getState) => {
    const route = routerSelectors.route(getState())
    dispatch(coreActions.navigateTo(route.name, params))
  },
  // set the values of the given params and merge
  // them into the existing params
  addQueryParams: (params = {}) => (dispatch, getState) => {
    const route = routerSelectors.route(getState())
    const queryParams = routerSelectors.queryParams(getState())
    const newParams = Object.assign({}, queryParams)
    Object
      .keys(params)
      .forEach(id => {
        const newValue = params[id]
        if(!newValue) delete(newParams[id])
        else newParams[id] = newValue
      })
    dispatch(coreActions.navigateTo(route.name, newParams))
  },
  // remove the given params
  removeQueryParams: (params = {}) => (dispatch, getState) => {
    const route = routerSelectors.route(getState())
    const queryParams = routerSelectors.queryParams(getState())
    const newParams = Object
      .keys(queryParams)
      .filter(id => {
        return typeof(params) === 'function' ?
          params(id) :
          params[id] ? false : true
      })
      .reduce((all, id) => {
        all[id] = queryParams[id]
        return all
      }, {})
    dispatch(coreActions.navigateTo(route.name, newParams))
  },
  // delete all query params
  clearQueryParams: () => (dispatch, getState) => {
    const route = routerSelectors.route(getState())
    dispatch(coreActions.navigateTo(route.name))
  },
}

const actions = Object.assign({}, coreActions, sideEffects)

export { actions, reducer }
export default actions