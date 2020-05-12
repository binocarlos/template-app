const harness = require('../harness')

harness('database:sanity no error', async (t, {
  knex,
  store,
}) => {
  const databaseUsers = await knex
    .select()
    .from('useraccount')
  const storeUsers = await store.auth.list()

  t.equal(databaseUsers.length, 0, `there are no database users`)
  t.ok(databaseUsers instanceof Array, `the database result is an array`)
  t.equal(storeUsers.length, 0, `there are no store users`)
  t.ok(storeUsers instanceof Array, `the store result is an array`)
})
