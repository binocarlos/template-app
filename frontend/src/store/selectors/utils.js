import { createSelector } from 'reselect'
import dotty from 'dotty'

// pluck a single prop from a previous selector
export const prop = (baseSelector, propName) => createSelector(
  baseSelector,
  data => dotty.get(data || {}, propName),
)

// return an object of prop selectors given a base selector
// and an array of prop names
export const props = (baseSelector, propNames) => propNames.reduce((all, propName) => {
  if(typeof(propName) == 'string') {
    propName = {
      selectorName: propName,
      dataField: propName,
    }
  }
  all[propName.selectorName] = prop(baseSelector, propName.dataField)
  return all
}, {})

export const networkProps = (prefix, fields) => fields.map(field => {
  return {
    selectorName: field,
    dataField: [prefix, field].join('/'),
  }
})

export const entity = ({
  baseSelector,
  entityName,
}) => {
  const entities = createSelector(
    baseSelector,
    baseStore => baseStore.entities[entityName] || {},
  )
  const ids = createSelector(
    baseSelector,
    baseStore => baseStore.result || [],
  )
  const list = createSelector(
    entities,
    ids,
    (entities, ids) => ids.map(id => entities[id])
  )
  const item = createSelector(
    entities,
    routeParamId,
    (entities, id) => {
      return id == 'new' ?
        {} :
        entities[id]
    },
  )
  const get = (state, id) => {
    const data = entities(state)
    return data[id]
  }

  return {
    entities,
    ids,
    list,
    item,
    get,
  }
}

export const networkErrors = state => state.network.errors
export const networkLoading = state => state.network.loading

export const route = state => state.router.route
export const previousRoute = state => state.router.previousRoute
export const routeParams = prop(route, 'params')
export const routeParamId = createSelector(
  routeParams,
  params => params.id,
)

export const DEFAULT_OBJECT = {}
export const DEFAULT_ARRAY = []