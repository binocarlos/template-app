const Auth = require('./auth')
const Pool = require('./pool')
const Vm = require('./vm')
const Lease = require('./lease')

const Store = ({
  knex,
}) => {
  const auth = Auth({
    knex,
  })

  const pool = Pool({
    knex,
  })

  const vm = Vm({
    knex,
  })

  const lease = Lease({
    knex,
  })

  return {
    knex,
    auth,
    pool,
    vm,
    lease,
  }
}

module.exports = Store