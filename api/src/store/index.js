const Auth = require('./auth')
const BookingForm = require('./bookingform')

const Store = ({
  knex,
}) => {
  const auth = Auth({
    knex,
  })

  const bookingform = BookingForm({
    knex,
  })

  return {
    knex,
    auth,
    bookingform,
  }
}

module.exports = Store