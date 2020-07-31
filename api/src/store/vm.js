const VmStore = ({
  knex,
}) => {
 
  const list = ({query = {}} = {}) => {
    return knex
      .select()
      .from('vm')
      .where(query)
  }

  const get = ({
    query,
  } = {}) => {
    return knex('vm')
      .where(query)
      .first()
  }

  const create = ({
    data,
  }) => 
    knex('vm')
      .insert(data)
      .returning('*')
      .get(0)

  const update = ({
    query,
    data,
  } = {}) => {
    return knex('vm')
      .where(query)
      .update(data)
      .returning('*')
      .get(0)
  }
    
  const del = ({
    query,
  }) => {
    return knex('vm')
      .where(query)
      .del()
      .returning('*')
      .get(0)
  }

  return {
    list,
    get,
    create,
    update,
    delete: del,
  }
}

module.exports = VmStore