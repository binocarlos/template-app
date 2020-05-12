const safeUser = (user) => {
  const ret = Object.assign({}, user)
  delete(ret.hashed_password)
  delete(ret.salt)
  return ret
}

module.exports = {
  safeUser,
}