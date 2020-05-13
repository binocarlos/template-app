const fs = require('fs')
const path = require('path')
const tape = require('tape')
const Knex = require('knex')
const axios = require('axios')
const getPort = require('get-port')
const randomstring = require('randomstring')

const Store = require('../src/store')
const Controllers = require('../src/controllers')
const App = require('../src/app')

const MIGRATIONS_FOLDER = path.join(__dirname, '..', 'migrations')

if(!fs.existsSync(MIGRATIONS_FOLDER)) {
  console.error(`the migrations folder was not found: ${MIGRATIONS_FOLDER}`)
  process.exit(1)
}

const getConnectionSettings = (databaseName) => {
  return {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_SERVICE_HOST || 'postgres',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: databaseName || 'postgres',
    },
    pool: {
      min: 0,
      max: 10,
    }
  }
}

const setupDatabase = async (options, context) => {
  if(!options.database) return
  const randomChars = randomstring.generate({
    length: 16,
    charset: 'alphabetic',
    capitalization: 'lowercase',
  })
  const databaseName = `testdb${randomChars}`
  const masterKnex = Knex(getConnectionSettings())
  await masterKnex.raw(`create database ${databaseName}`)
  const testKnex = Knex(getConnectionSettings(databaseName))
  await testKnex.migrate.latest({
    directory: MIGRATIONS_FOLDER,
  })
  await masterKnex.destroy()
  context.databaseName = databaseName
  context.knex = testKnex
  context.store = Store({
    knex: testKnex,
  })
  context.controllers = Controllers({
    store: context.store,
  })
}

const destroyDatabase = async (options, context) => {
  if(!options.database) return
  if(!context.knex) return
  await context.knex.destroy()
  if(process.env.KEEP_DATABASE) return
  const masterKnex = Knex(getConnectionSettings())
  await masterKnex.raw(`drop database ${context.databaseName}`)
  await masterKnex.destroy()
}

const setupWebserver = async (options, context) => {
  if(!options.web) return
  const port = await getPort()
  const app = App({
    store: context.store,
    controllers: context.controllers,
  })
  context.server = app.listen(port)
  context.port = port
  context.url = `http://localhost:${port}`
  context.getClient = ({
    base = '/api/v1',
  } = {}) => {
    const factory = method => async (url, data) => {
      const useUrl = `${context.url}${base}${url}`
      try {
        console.log(`${method} ${useUrl}`)
        if(data) console.log(JSON.stringify(data, null, 4))
        const res = await axios({
          method,
          url: useUrl,
          data,
        })
        console.log(`${res.status}`)
        if(res.data) console.log(JSON.stringify(res.data, null, 4))
        return res
      } catch(err) {
        console.log(`${err.response.status}`)
        if(err.response.data) console.log(JSON.stringify(err.response.data, null, 4))
        return err.response
      }
    }
      
    return {
      get: factory('get'),
      post: factory('post'),
      put: factory('put'),
      delete: factory('delete'),
    }
  }
}

const destroyWebserver = async (options, context) => {
  if(!options.web) return
  if(!context.server) return
  context.server.close()
}

const testHarness = (name, handler, options = {
  database: true,
  web: false,
}) => {
  if(options.web) options.database = true
  const context = {}
  tape(name, async (t) => {
    try {
      await setupDatabase(options, context)
      await setupWebserver(options, context)
      await handler(t, context)
    } catch(err) {
      t.fail(err)
      console.log(err.stack)
    }
    await destroyWebserver(options, context)
    await destroyDatabase(options, context)
    t.end()
  })
}

module.exports = testHarness