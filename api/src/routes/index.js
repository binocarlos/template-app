const express = require('express')
const bodyParser = require('body-parser')
const AuthAccess = require('../authentication/authAccess')
const JWTAuthentication = require('../authentication/jwt')
const AuthRoutes = require('./auth')

const Routes = ({
  controllers,
}) => {

  const app = express()

  const authAccess = AuthAccess({
    controllers,
  })

  const auth = AuthRoutes({
    controllers,
  })

  app.use(bodyParser.json({limit: '50mb'}))
  app.use(JWTAuthentication({
    controllers,
  }))

  app.get('/auth/status', auth.status)
  app.post('/auth/register', auth.register)
  app.post('/auth/login', auth.login)
  app.post('/auth/token', authAccess.loggedIn, auth.getToken)

  //app.get('/auth/list', authAccess.admin, auth.list)

  return app
}

module.exports = Routes
