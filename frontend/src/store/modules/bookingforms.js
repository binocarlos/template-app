import CreateReducer from '../utils/createReducer'
import CreateActions from '../utils/createActions'

import {
  handlers,
} from '../utils/api'

import networkWrapper from '../utils/networkWrapper'
import routerActions from './router'
import snackbarActions from './snackbar'

const prefix = 'bookingforms'
const wrapper = networkWrapper.factory(prefix)

const initialState = {
  data: [],
}

const reducers = {
  setData: (state, action) => {
    state.data = action.payload
  },
}

const sideEffects = {

  load: () => wrapper('load', async (dispatch, getState) => {
    const data = await handlers.get(`/bookingforms`)
    await dispatch(actions.setData(data))
  }),

  save: (id, payload) => wrapper('save', async (dispatch, getState) => {
    if(id == 'new') {
      await handlers.post(`/bookingforms`, payload)
    }
    else {
      await handlers.put(`/bookingforms/${id}`, payload)
    }
    await dispatch(actions.load())
    dispatch(snackbarActions.setSuccess(`booking form ${id == 'new' ? 'created' : 'updated'}`))
    dispatch(routerActions.navigateTo('admin.bookingforms.list'))
  }),

  delete: (id) => wrapper('update', async (dispatch, getState) => {
    await handlers.delete(`/bookingforms/${id}`)
    await dispatch(actions.load())
    dispatch(snackbarActions.setSuccess(`booking form deleted`))
    return true
  }),

}

const reducer = CreateReducer({
  initialState,
  reducers,
  prefix,
})

const actions = CreateActions({
  reducers,
  sideEffects,
  prefix,
})

export { actions, reducer }
export default actions