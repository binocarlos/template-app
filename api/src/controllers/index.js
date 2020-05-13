const Auth = require('./auth')
const Storage = require('./storage')

const Controllers = ({
  store,
}) => {

  let controllers = {}
  const getController = (name) => controllers[name]

  const auth = Auth({
    store,
    getController,
  })

  const storage = Storage({
    store,
    getController,
  })

  controllers = {
    auth,
    storage,
  }

  return controllers
}

module.exports = Controllers