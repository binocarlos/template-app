const SEARCH_FIELDS = [
  'username',
  `meta->'google'->>'displayName'`,
  `meta->'google'->>'email'`,
]

const AuthStore = ({
  knex,
}) => {
  
  /*
  
    list

      * search
    
  */
  const list = (params = {}) => {
    const query = knex
      .select()
      .from('useraccount')

    if(params.search) {
      const sql = SEARCH_FIELDS.map(f => `${f} ILIKE ?`).join(' or ')
      const sqlparams = SEARCH_FIELDS.map(f => `%${params.search}%`)
      query.whereRaw(sql, sqlparams)
    }

    return query
  }

  /*
  
    get

      * id
      * username
  
  */
  const get = (params) => 
    knex('useraccount')
      .where(params)
      .first()

  /*
  
    create

      * data
    
  */
  const create = (params) => 
    knex('useraccount')
      .insert(params.data)
      .returning('*')
      .get(0)

  /*
  
    save

      * id
      * data
    
  */
  const save = (params) => 
    knex('useraccount')
      .where({id: params.id})
      .update(params.data)
      .returning('*')
      .get(0)

  /*
  
    update - merges meta data top-level keys

      * id
      * data
    
  */
  const updateMeta = async (params) => {
    const {
      id,
      data,
    } = params
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
    save,
    updateMeta,
  }
}

module.exports = AuthStore