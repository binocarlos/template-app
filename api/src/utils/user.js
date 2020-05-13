const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const settings = require('../settings')

const hashPassword = (password) => bcrypt.hash(password, settings.salt_rounds)
const checkPassword = (password, hashed_password) => bcrypt.compare(password, hashed_password)

const getToken = async (id) => {
  const token = await new Promise((resolve, reject) => {
    jwt.sign({id}, settings.jwt_secret_key, {
      expiresIn: settings.jwt_expiry,
    }, (err, token) => {
      if(err) return reject(err)
      resolve(token)
    })
  })
  return token
}

const verifyToken = async (token) => {
  const payload = await new Promise((resolve, reject) => {
    jwt.verify(token, settings.jwt_secret_key, (err, result) => {
      if(err) return reject(err)
      resolve(result)
    })
  })
  return payload
}

const safeUser = (user) => {
  const ret = Object.assign({}, user)
  delete(ret.hashed_password)
  delete(ret.salt)
  return ret
}

module.exports = {
  hashPassword,
  checkPassword,
  getToken,
  verifyToken,
  safeUser,
}