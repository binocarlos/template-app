const express = require('express')
const bodyParser = require('body-parser')
const AuthAccess = require('../authentication/authAccess')
const JWTAuthentication = require('../authentication/jwt')
const AuthRoutes = require('./auth')
const BookingFormRoutes = require('./bookingform')
const StorageRoutes = require('./storage')

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

  const bookingform = BookingFormRoutes({
    controllers,
  })

  const storage = StorageRoutes({
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

  app.get('/storage/download', storage.download)
  app.post('/storage/upload', authAccess.loggedIn, storage.upload)

  app.get('/bookingforms', authAccess.loggedIn, bookingform.list)
  app.get('/bookingforms/:id', authAccess.loggedIn, bookingform.get)
  app.post('/bookingforms', authAccess.loggedIn, bookingform.create)
  app.put('/bookingforms/:id', authAccess.loggedIn, bookingform.update)
  app.delete('/bookingforms/:id', authAccess.loggedIn, bookingform.delete)

  return app
}

module.exports = Routes