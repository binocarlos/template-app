const AuthAccess = ({
  controllers,
}) => {

  const loggedIn = (req, res, next) => {
    if(req.user) return next()
    res.status(403)
    res.json({
      error: 'access denied',
    })
  }

  return {
    loggedIn,
  }
}

module.exports = AuthAccess