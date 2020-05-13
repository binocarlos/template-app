const ExtractJwt = require('passport-jwt').ExtractJwt
const userUtils = require('../utils/user')

const JWTAuthentication = ({
  controllers,
}) => {
  const tokenExtractor = ExtractJwt.fromAuthHeaderAsBearerToken()
  return async function jwtAuth(req, res, next) {
    try {
      const token = tokenExtractor(req)
      if(!token) return next()
      const payload = await userUtils.verifyToken(token)
      if(!payload || !payload.id) return next()
      const user = await controllers.auth.get({
        id: payload.id,
      })
      if(!user) return next()
      req.user = user
      next()
    } catch(e) {
      return next()
    }
  }
}

module.exports = JWTAuthentication