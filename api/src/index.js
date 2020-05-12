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
const redis = Redis(settings.databases.redis)

const store = Store({
  knex,
  redis,
})

const controllers = Controllers({
  store,
})

const app = App({
  store,
  redis,
  controllers,
})

const server = app.listen(settings.port, () => {
  pino.info({
    action: 'webserver.start',
    message: `webserver started on port ${settings.port}`,
  })
})

monitoring.shutdownHandler(server)
