import { createSelector } from 'reselect'

import {
  networkGroup,
} from './utils'

import router from './router'

const data = state => state.item.data
const editItem = createSelector(
  data,
  router.route,
  (data, route) => data.find(form => form.id == route.params.id)
)

const selectors = {
  data,
  editItem,
  ...networkGroup('item', [
    'load',
    'save',
    'delete',
  ])
}

export default selectors
