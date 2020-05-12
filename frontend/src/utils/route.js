const routePathToName = (path) => {
  const name = path
    .replace(/^\//, '')
    .replace(/\//g, '-')
  return name || 'root'
}

const sanitizeRoute = (path) => path.replace(/\/+/g, '/')

const utils = {
  routePathToName,
  sanitizeRoute,
}

export default utils
