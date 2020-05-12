const store = (state) => state.network
const loading = (state, name) => store(state).loading[name]
const error = (state, name) => store(state).errors[name]

const selectors = {
  store,
  loading,
  error,
}

export default selectors
