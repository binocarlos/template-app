const Auth = require('./auth')

const Controllers = ({
  store,
}) => {

  let controllers = {}
  const getController = (name) => controllers[name]

  const auth = Auth({
    store,
    getController,
  })

  controllers = {
    auth,
  }

  return controllers
}

module.exports = Controllers