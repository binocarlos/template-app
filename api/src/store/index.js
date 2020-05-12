const Auth = require('./auth')

const Store = ({
  knex,
}) => {
  const auth = Auth({
    knex,
  })

  return {
    auth,
    knex,
  }
}

module.exports = Store