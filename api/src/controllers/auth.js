const userUtils = require('../utils/user')

const AuthController = ({
  store,
}) => {
  
  const getToken = async ({
    userid,
  }) => {
    if(!userid) throw new Error(`userid required for getToken`)
    const token = await userUtils.getToken(userid)
    return {token}
  }
  
  const get = (query) => 
    store.auth.get(query)
      .then(user => userUtils.safeUser(user))

  const create = (data) => 
    store.auth.create(data)
      .then(user => userUtils.safeUser(user))

  const update = ({id,data}) => 
    store.auth.update({id,data})
      .then(user => userUtils.safeUser(user))

  return {
    getToken,
    get,
    create,
    update,
  }
}

module.exports = AuthController