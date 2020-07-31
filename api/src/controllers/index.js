const Auth = require('./auth')
const Pool = require('./pool')
const Vm = require('./vm')
const Lease = require('./lease')
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

  const pool = Pool({
    store,
    getController,
  })

  const vm = Vm({
    store,
    getController,
  })

  const lease = Lease({
    store,
    getController,
  })

  controllers = {
    auth,
    storage,
    pool,
    vm,
    lease,
  }

  return controllers
}

module.exports = Controllers