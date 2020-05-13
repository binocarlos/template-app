const store = (state) => state.network
const globalLoading = (state) => state.network.globalLoading
const loading = (state, name) => store(state).loading[name]
const error = (state, name) => store(state).errors[name]

const selectors = {
  store,
  globalLoading,
  loading,
  error,
}

export default selectors
