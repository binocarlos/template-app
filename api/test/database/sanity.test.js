const harness = require('../harness')

harness('database:sanity no error', async (t, {
  knex,
  store,
  controllers,
}) => {
  const databaseUsers = await knex
    .select()
    .from('useraccount')
  const storeUsers = await store.auth.list()
  const controllerUsers = await controllers.auth.list()

  t.equal(databaseUsers.length, 0, `there are no database users`)
  t.ok(databaseUsers instanceof Array, `the database result is an array`)
  t.equal(storeUsers.length, 0, `there are no store users`)
  t.ok(storeUsers instanceof Array, `the store result is an array`)
  t.equal(controllerUsers.length, 0, `there are no controller users`)
  t.ok(controllerUsers instanceof Array, `the controller result is an array`)
})
