const Auth = require('./auth')
const Item = require('./item')

const Store = ({
  knex,
}) => {
  const auth = Auth({
    knex,
  })

  const item = Item({
    knex,
  })

  return {
    knex,
    auth,
    item,
  }
}

module.exports = Store