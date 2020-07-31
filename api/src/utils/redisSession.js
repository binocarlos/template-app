const ExpressSession = require('express-session')
const RedisStore = require('connect-redis')(ExpressSession)

function RedisSession({
  secret,
  redis,
}) {
  const store = new RedisStore({
    client: redis,
  })
  return ExpressSession({
    store: store,
    secret: secret,
    resave: false,
    saveUninitialized: false
  })
}

module.exports = RedisSession