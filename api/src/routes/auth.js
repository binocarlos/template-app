const asyncHandler = require('express-async-handler')
const userUtils = require('../utils/user')

const AuthRoutes = ({
  controllers,
}) => {

  const status = (req, res) => {
    res.json(req.user ? userUtils.safeUser(req.user) : null)
  }

  const register = async (req, res) => {
    try {
      const result = await controllers.auth.register(req.body)
      res.status(201)
      res.json(result)
    } catch(e) {
      res.status(400)
      res.json({
        error: e.toString()
      })
    }
  }

  const login = async (req, res) => {
    try {
      const result = await controllers.auth.login(req.body)
      if(result) {
        res.json(result)
      }
      else {
        res.status(403)
        res.json({
          error: `incorrect details`
        })
      }
    } catch(e) {
      res.status(403)
      res.json({
        error: e.toString()
      })
    }
  }

  const getToken = async (req, res) => {
    const result = await controllers.auth.getToken({
      userid: req.user.id
    })
    res.status(201)
    res.json(result)
  }

  return {
    status: asyncHandler(status),
    register: asyncHandler(register),
    login: asyncHandler(login),
    getToken: asyncHandler(getToken), 
  }
}

module.exports = AuthRoutes