const Auth = require('./auth')
const Item = require('./item')
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

  const item = Item({
    store,
    getController,
  })

  const storage = Storage({
    store,
    getController,
  })

  controllers = {
    auth,
    item,
    storage,
  }

  return controllers
}

module.exports = Controllers