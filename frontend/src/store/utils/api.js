import axios from 'axios'
import { API } from 'settings'

export const getHTTPTokenHeaders = token => {
  return token ? {
    Authorization: token ? `Bearer ${token}` : '',
  } : {} 
}

export const setHTTPToken = token => {
  axios.defaults.headers.common = getHTTPTokenHeaders(token)
}

export const unsetHTTPToken = () => {
  axios.defaults.headers.common = getHTTPTokenHeaders()
}

// pluck an error message from the response body if present
export const getErrorMessage = (error) => {
  const res = error.response
  let message = ''
  if(res && res.data) {
    message = res.data.error || res.data.message
  }
  message = message || error.toString()
  return message.replace(/^Error\: Error\:/, 'Error:')
}

export const getUrl = (path) => `${API}${path}`

const factory = method => async (url, data, extra = {}) => axios({
  method,
  url: `${API}${url}`,
  data,
  ...extra
}).then(res => res.data)

export const handlers = {
  get: factory('get'),
  post: factory('post'),
  put: factory('put'),
  delete: factory('delete'),
}