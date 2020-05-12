const axios = require('axios')
const harness = require('./harness')

harness('database:sanity', async (t, {
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

harness('web:sanity', async (t, {
  url,
}) => {
  const result = await axios.get(`${url}/k8s-probe`)
  t.deepEqual(result.data, {ok: true}, `the data is returned`)
}, {
  web: true,
})
