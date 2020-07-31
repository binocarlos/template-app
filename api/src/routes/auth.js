const asyncHandler = require('express-async-handler')
const userUtils = require('../utils/user')

const AuthRoutes = ({
  controllers,
}) => {

  const status = (req, res) => {
    res.json(req.user ? userUtils.safeUser(req.user) : null)
  }

  const getToken = async (req, res) => {
    const result = await controllers.auth.getToken({
      userid: req.user.id
    })
    res.status(201)
    res.json(result)
  }

  const logout = async (req, res) => {
    req.session.destroy(function () {
      res.json({
        ok: true,
      })
    })
  }

  return {
    status: asyncHandler(status),
    getToken: asyncHandler(getToken),
    logout: asyncHandler(logout),
  }
}

module.exports = AuthRoutes