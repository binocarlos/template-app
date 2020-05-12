const tape = require('tape')
const database = require('./database')

const Store = require('../src/store')

const TestHarness = (name, handler) => {
  database.testSuiteWithDatabase(getConnection => {
    const getStore = () => Store({
      knex: getConnection(),
    })
    tape(name, async (t) => {
      try {
        await handler(t, {
          getConnection,
          getStore,
        })
      } catch(err) {
        t.fail(err)
        console.log(err.stack)
      }
      t.end()
    })
  })
}

module.exports = TestHarness