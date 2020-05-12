const asyncHandler = require('express-async-handler')
const userUtils = require('../utils/user')

const AuthRoutes = ({
  controllers,
}) => {

  const status = (req, res) => {
    res.json(req.user ? userUtils.safeUser(req.user) : null)
  }

  return {
    status: asyncHandler(status),
  }
}

module.exports = AuthRoutes