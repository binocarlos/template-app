const LeaseStore = ({
  knex,
}) => {
 
  const list = ({query = {}} = {}) => {
    return knex
      .select()
      .from('lease')
      .where(query)
  }

  const get = ({
    query,
  } = {}) => {
    return knex('lease')
      .where(query)
      .first()
  }

  const create = ({
    data,
  }) => 
    knex('lease')
      .insert(data)
      .returning('*')
      .get(0)

  const update = ({
    query,
    data,
  } = {}) => {
    return knex('lease')
      .where(query)
      .update(data)
      .returning('*')
      .get(0)
  }
    
  const del = ({
    query,
  }) => {
    return knex('lease')
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

module.exports = LeaseStore