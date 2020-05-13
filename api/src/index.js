const pino = require('pino')({
  name: 'index',
})

const Knex = require('./database/knex')

const Store = require('./store')
const Controllers = require('./controllers')

const settings = require('./settings')
const App = require('./app')

const knex = Knex(settings.databases.postgres)

const store = Store({
  knex,
})

const controllers = Controllers({
  store,
})

const app = App({
  store,
  controllers,
})

app.listen(settings.port, () => {
  pino.info({
    action: 'webserver.start',
    message: `webserver started on port ${settings.port}`,
  })
})