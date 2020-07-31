const pino = require('pino')({
  name: 'index',
})

const Knex = require('./database/knex')
const Redis = require('./database/redis')

const Store = require('./store')
const Controllers = require('./controllers')

const settings = require('./settings')
const App = require('./app')

const knex = Knex(settings.databases.postgres)

const redis = Redis()

const store = Store({
  knex,
})

const controllers = Controllers({
  store,
})

const app = App({
  store,
  redis,
  controllers,
})

app.listen(settings.port, () => {
  pino.info({
    action: 'webserver.start',
    message: `webserver started on port ${settings.port}`,
  })
})