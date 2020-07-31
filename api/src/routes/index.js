const express = require('express')
const bodyParser = require('body-parser')
const AuthAccess = require('../authentication/authAccess')
const JWTAuthentication = require('../authentication/jwt')
const GoogleAuthentication = require('../authentication/google')
const AuthRoutes = require('./auth')
const PoolRoutes = require('./pool')
const VmRoutes = require('./vm')
const LeaseRoutes = require('./lease')
const StorageRoutes = require('./storage')

const Routes = ({
  store,
  redis,
  controllers,
}) => {

  const app = express()

  const authAccess = AuthAccess({
    controllers,
  })

  const auth = AuthRoutes({
    controllers,
  })

  const pool = PoolRoutes({
    controllers,
  })

  const vm = VmRoutes({
    controllers,
  })

  const lease = LeaseRoutes({
    controllers,
  })

  const storage = StorageRoutes({
    controllers,
  })

  app.use(bodyParser.json({limit: '50mb'}))
  app.use(JWTAuthentication({
    controllers,
  }))

  if(redis) {
    GoogleAuthentication({
      redis,
      app,
      store,
      controllers,
    })
  }

  app.get('/auth/status', auth.status)
  app.post('/auth/token', authAccess.loggedIn, auth.getToken)
  app.post('/auth/logout', authAccess.loggedIn, auth.logout)

  app.get('/storage/download', storage.download)
  app.post('/storage/upload', authAccess.loggedIn, storage.upload)

  app.get('/pools', pool.list)
  app.get('/pools/:id', pool.get)
  app.post('/pools', pool.create)
  app.put('/pools/:id', pool.update)
  app.delete('/pools/:id', pool.delete)

  app.get('/pools/:poolid/vms', vm.list)
  app.get('/pools/:poolid/vms/:vmid', vm.get)
  app.post('/pools/:poolid/vms', vm.create)
  app.put('/pools/:poolid/vms/:vmid', vm.update)
  app.delete('/pools/:poolid/vms/:vmid', vm.delete)

  app.get('/pools/:poolid/leases', lease.list)
  app.get('/pools/:poolid/leases/:leaseid', lease.get)
  app.post('/pools/:poolid/leases', lease.create)
  app.put('/pools/:poolid/leases/:leaseid', lease.update)
  app.delete('/pools/:poolid/leases/:leaseid', lease.delete)

  return app
}

module.exports = Routes