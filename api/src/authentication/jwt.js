const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const pino = require('pino')({
  name: 'jwt',
})

const settings = require('../settings')

const JWTAuthentication = ({
  controllers,
}) => {
  const tokenExtractor = ExtractJwt.fromAuthHeaderAsBearerToken()
  return async function jwtAuth(req, res, next) {
    try {
      const token = tokenExtractor(req)
      if(!token) return next()
      const payload = await new Promise((resolve, reject) => {
        jwt.verify(token, settings.jwt_secret_key, (err, result) => {
          if(err) return reject(err)
          resolve(result)
        })
      })
      if(payload.userid) {
        const user = await controllers.auth.get({
          id: payload.userid,
        }, true)
        if(!user) return next()
        req.user = user
      }
      next()
    } catch(e) {
      pino.error({
        error: e.toString()
      })
      return next()
    }
  }
}

module.exports = JWTAuthentication