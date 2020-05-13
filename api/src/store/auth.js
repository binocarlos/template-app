const SEARCH_FIELDS = [
  'email',
  `meta->'fullName'`,
]

const AuthStore = ({
  knex,
}) => {
 
  const list = ({
    search,
  } = {}) => {
    const query = knex
      .select()
      .from('useraccount')
    if(search) {
      const sql = SEARCH_FIELDS.map(f => `${f} ILIKE ?`).join(' or ')
      const sqlparams = SEARCH_FIELDS.map(f => `%${search}%`)
      query.whereRaw(sql, sqlparams)
    }
    return query
  }

  const get = ({
    id,
    email,
  } = {}) => {
    if(!id && !email) throw new Error(`id or email required for auth.get`)
    const query = {}
    if(id) query.id = id
    else if(email) query.email = email
    return knex('useraccount')
      .where(query)
      .first()
  }

  const create = ({
    email,
    hashed_password,
    meta = {},
  } = {}) => 
    knex('useraccount')
      .insert({
        email,
        hashed_password,
        meta,
      })
      .returning('*')
      .get(0)

  const update = ({
    id,
    data,
  } = {}) => 
    knex('useraccount')
      .where({id})
      .update(data)
      .returning('*')
      .get(0)

  const updateMeta = async ({
    id,
    data,
  }) => {
    const user = await get({id})
    const meta = Object.assign({}, user.meta, data)
    return knex('useraccount')
      .where({id})
      .update({
        meta,
      })
      .returning('*')
      .get(0)
  }

  return {
    list,
    get,
    create,
    update,
    updateMeta,
  }
}

module.exports = AuthStore