const ItemStore = ({
  knex,
}) => {
 
  const list = ({
    userid,
  } = {}) => {
    if(!userid) throw new Error(`userid required for item.list`)
    return knex
      .select()
      .from('item')
      .where({
        useraccount: userid,
      })
  }

  const get = ({
    userid,
    id,
  } = {}) => {
    if(!id) throw new Error(`id required for item.get`)
    return knex('item')
      .where({
        useraccount: userid,
        id,
      })
      .first()
  }

  const create = ({
    userid,
    data,
  }) => 
    knex('item')
      .insert(Object.assign({}, data, {
        useraccount: userid,
      }))
      .returning('*')
      .get(0)

  const update = ({
    id,
    userid,
    data,
  } = {}) => {
    if(!id) throw new Error(`id required for item.update`)
    return knex('item')
      .where({
        useraccount: userid,
        id,
      })
      .update(data)
      .returning('*')
      .get(0)
  }
    
  const del = ({
    id,
    userid,
  }) => {
    if(!id) throw new Error(`id required for item.delete`)
    return knex('item')
      .where({
        useraccount: userid,
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

module.exports = ItemStore