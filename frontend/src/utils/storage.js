import {
  API,
} from 'settings'

export const getUrl = (filepath) => `${API}/storage/download?filepath=${encodeURIComponent(filepath)}`