const AuthAccess = ({
  controllers,
}) => {

  const loggedIn = (req, res, next) => {
    if(req.user) return next()
    res.status(401)
    res.json({
      error: 'access denied',
    })
  }

  const admin = (req, res, next) => {
    if(req.user && req.user.tags.indexOf('admin') >= 0) return next()
    res.status(401)
    res.json({
      error: 'access denied',
    })
  }

  return {
    loggedIn,
    admin,
  }
}

module.exports = AuthAccess