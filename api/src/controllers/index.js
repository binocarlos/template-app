const Auth = require('./auth')
const BookingForm = require('./bookingform')
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

  const bookingform = BookingForm({
    store,
    getController,
  })

  const storage = Storage({
    store,
    getController,
  })

  controllers = {
    auth,
    bookingform,
    storage,
  }

  return controllers
}

module.exports = Controllers