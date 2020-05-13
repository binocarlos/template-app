const userUtils = require('../utils/user')

const AuthController = ({
  store,
}) => {
  
  const register = async ({
    email,
    password,
  }) => {
    const existing = await store.auth.get({email})
    if(existing) throw new Error(`user with email ${email} already exists`)
    const hashed_password = await userUtils.hashPassword(password)
    const user = await store.auth.create({
      email,
      hashed_password,
      meta: {},
    })
    const token = await userUtils.getToken(user.id)
    return {token}
  }

  const login = async ({
    email,
    password,
  }) => {
    const user = await store.auth.get({email})
    if(!user) return null
    const correct = await userUtils.checkPassword(password, user.hashed_password)
    if(!correct) return null
    const token = await userUtils.getToken(user.id)
    return {token}
  }

  const getToken = async ({
    userid,
  }) => {
    if(!userid) throw new Error(`userid required for getToken`)
    const token = await userUtils.getToken(userid)
    return {token}
  }
  
  const list = ({
    search,
  } = {}) => 
    store.auth.list({
      search,
    })
    .then(users => users.map(userUtils.safeUser))
  
  const get = ({
    id,
    email,
  } = {}) => 
    store.auth.get({
      id,
      email,
    })
      .then(user => userUtils.safeUser(user))

  const update = ({
    id,
    data,
  } = {}) => 
    store.auth.save({id,data})
      .then(user => userUtils.safeUser(user))
    
  const updateMeta = ({
    id,
    data,
  } = {}) => 
    store.auth.updateMeta({id,data})
      .then(user => userUtils.safeUser(user))

  return {
    register,
    login,
    getToken,
    list,
    get,
    update,
    updateMeta,
  }
}

module.exports = AuthController