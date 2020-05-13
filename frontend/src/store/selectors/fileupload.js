import {
  props,
  networkProps,
  networkErrors,
  networkLoading,
} from './utils'

const NETWORK_NAMES = networkProps('fileupload', [
  'uploadFiles',
  'syncFiles',
])

const inProgress = state => state.fileupload.inProgress
const status = state => state.fileupload.status

const selectors = {
  errors: props(networkErrors, NETWORK_NAMES),
  loading: props(networkLoading, NETWORK_NAMES),
  inProgress,
  status,
}

export default selectors