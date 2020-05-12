const database = require('../database')
const asyncTest = require('../asyncTest')

database.testSuiteWithDatabase(getConnection => {

  // const getStore = () => Store({
  //   knex: getConnection(),
  // })

  asyncTest('database:sanity', async (t) => {
    const knex = getConnection()
    const users = await knex
      .select()
      .from('useraccount')
    t.equal(users.length, 0, `there are no users`)
    t.ok(users instanceof Array, `the result is an array`)
  })
})

