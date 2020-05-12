const bcrypt = require('bcrypt')
const settings = require('../settings')

const hashPassword = (password) => bcrypt.hash(password, settings.salt_rounds)
const checkPassword = (password, hashed_password) => bcrypt.compare(password, hashed_password)

const safeUser = (user) => {
  const ret = Object.assign({}, user)
  delete(ret.hashed_password)
  delete(ret.salt)
  return ret
}

module.exports = {
  safeUser,
  hashPassword,
  checkPassword,
}