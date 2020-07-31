const PoolStore = ({
  knex,
}) => {
 
  const list = ({
    
  } = {}) => {
    return knex
      .select()
      .from('pool')
  }

  const get = ({
    id,
  } = {}) => {
    if(!id) throw new Error(`id required for item.get`)
    return knex('pool')
      .where({
        id,
      })
      .first()
  }

  const create = ({
    data,
  }) => 
    knex('pool')
      .insert(data)
      .returning('*')
      .get(0)

  const update = ({
    id,
    data,
  } = {}) => {
    if(!id) throw new Error(`id required for item.update`)
    return knex('pool')
      .where({        
        id,
      })
      .update(data)
      .returning('*')
      .get(0)
  }
    
  const del = ({
    id,
  }) => {
    if(!id) throw new Error(`id required for item.delete`)
    return knex('pool')
      .where({
        id,
      })
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

module.exports = PoolStore