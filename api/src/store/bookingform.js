const BookingFormStore = ({
  knex,
}) => {
 
  const list = ({
    userid,
  } = {}) => {
    if(!userid) throw new Error(`userid required for bookingform.list`)
    return knex
      .select()
      .from('bookingform')
      .where({
        useraccount: userid,
      })
  }

  const get = ({
    userid,
    id,
  } = {}) => {
    if(!id) throw new Error(`id required for bookingform.get`)
    return knex('bookingform')
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
    knex('bookingform')
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
    if(!id) throw new Error(`id required for bookingform.update`)
    return knex('bookingform')
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
    if(!id) throw new Error(`id required for bookingform.delete`)
    return knex('bookingform')
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

module.exports = BookingFormStore