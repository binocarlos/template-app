const randomstring = require('randomstring')
const jwt = require('jsonwebtoken')
const userUtils = require('../utils/user')
const settings = require('../settings')

const AuthController = ({
  store,
}) => {
  
  /*
  
    list

      * search
    
  */
  const list = (params = {}) => 
    store.auth.list({
      search: params.search
    })
    .then(users => users.map(userUtils.safeUser))
  
  /*
  
    load

      * id
      * username
      * withSecrets
    
  */
  const get = (params, withSecrets) => 
    store.auth.get(params)
      .then(user => withSecrets ? user : userUtils.safeUser(user))

  /*
  
    ensure user - will return user if it exists

      * username
    
  */

  const ensure = async (params) => {
    const {
      username,
    } = params

    const user = await store.auth.get({
      username,
    })

    if(user) return user

    return store.auth.create({
      data: {
        username,
      }
    })
      .then(user => userUtils.safeUser(user))
  }

  /*
  
    save

      * id
      * data
    
  */
  const save = (params) => 
    store.auth.save(params)
      .then(user => userUtils.safeUser(user))
    

  /*
  
    update

      * id
      * data
    
  */
  const updateMeta = (params) => 
    store.auth.updateMeta(params)
      .then(user => userUtils.safeUser(user))

  /*
  
    generateToken

    * id

    generate a random string and save the random string to the user record
    include the random string in the JWT and return it

    this means when access tokens are rotated the old tokens are invalid

  */
  const encodeToken = async ({
    id,
    accessSecret,
  }) => {
    const payload = {
      userid: id,
      access_token_secret: accessSecret,
    }

    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, settings.jwt_secret_key, (err, token) => {
        if(err) return reject(err)
        resolve(token)
      })
    })

    return {
      token
    }
  }

  const generateAccessToken = async ({
    id,
  }) => {
    const accessSecret = randomstring.generate({
      length: 32,
      charset: 'alphabetic'
    })

    await store.auth.save({
      id,
      data: {
        access_token_secret: accessSecret,
      }
    })

    const token = await encodeToken({
      id,
      accessSecret,
    })

    return token
  }

  const ensureAccessToken = async ({
    id,
  }) => {
    const userData = await store.auth.get({
      id,
    })

    if(!userData.access_token_secret) {
      const result = await generateAccessToken({
        id,
      })
      return result
    }
    else {
      const result = await encodeToken({
        id,
        accessSecret: userData.access_token_secret,
      })
      return result
    }
  }
  

  return {
    list,
    get,
    ensure,
    save,
    updateMeta,
    generateAccessToken,
    ensureAccessToken,
  }
}

module.exports = AuthController