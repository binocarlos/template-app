const express = require('express')

const ApiRoutes = require('./routes')
const settings = require('./settings')

const pino = require('pino')({
  name: 'app',
})

const App = ({
  store,
  redis,
  controllers,
}) => {

  const app = express()

  app.use(settings.base, ApiRoutes({
    store,
    redis,
    controllers,
  }))

  app.use((req, res, next) => {
    res.status(res._code || 404)
    res.json({ error: `url ${req.url} not found` })
  })

  app.use((err, req, res, next) => {
    pino.error({
      action: 'error',
      error: err.toString(),
      code: res._code,
      stack: err.stack,
    })
    res.status(res._code || 500)
    res.json({ error: err.toString() })
  })

  return app
}

module.exports = App