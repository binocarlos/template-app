const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const refreshOauth2 = require('passport-oauth2-refresh')
const cookieParser = require('cookie-parser')
const RedisSession = require('../utils/redisSession')
const userUtils = require('../utils/user')

const settings = require('../settings')

const GoogleAuthentication = ({
  redis,
  app,
  store,
  controllers,
}) => {

  const session = RedisSession({
    secret: settings.cookie_secret,
    redis
  })

  const google = new GoogleStrategy({
    clientID: settings.google_client_id,
    clientSecret: settings.google_client_secret,
    callbackURL: `${settings.app_url}/api/v1/auth/google/callback`,
    passReqToCallback: true,
  }, async (req, access_token, refresh_token, profile, done) => {
    try {
      let user = await store.auth.get({
        google_id: profile.id,
      })

      if(!user) {
        user = await store.auth.create({
          google_id: profile.id,
          meta: {
            google: profile,
          }
        })
      }

      done(null, user)
    } catch(err) {
      done(err)
    }  
  })

  passport.use('google', google)
  refreshOauth2.use(google)

  passport.serializeUser((req, user, done) => {
    done(null, user.id)
  })

  // the backend handler should not expose sensitive data
  passport.deserializeUser(async (req, id, done) => {
    try {
      const user = await controllers.auth.get({id})
      if(user) {
        done(null, user)
      }
      else {
        req.session.destroy(function () {
          done(`no user found for session`)
        })
      }
    } catch(err) {
      done(err)
    }
  })

  app.use(cookieParser())
  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: settings.googleScope,
    }))

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: settings.google_failure_redirect }),
    async (req, res, next) => {
      res.redirect(settings.google_login_redirect)
    })
}

module.exports = GoogleAuthentication