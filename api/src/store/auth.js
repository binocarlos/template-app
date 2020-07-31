const AuthStore = ({
  knex,
}) => {
 
  const get = (query) => {
    return knex('useraccount')
      .where(query)
      .first()
  }

  const create = (data) => 
    knex('useraccount')
      .insert(data)
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

  return {
    get,
    create,
    update,
  }
}

module.exports = AuthStore