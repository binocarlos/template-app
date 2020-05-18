const ItemController = ({
  store,
}) => {
  
  const list = async ({
    userid,
  }) => store.item.list({
    userid,
  })

  const get = async ({
    userid,
    id,
  }) => store.item.get({
    userid,
    id,
  })

  const create = async ({
    userid,
    data,
  }) => store.item.create({
    userid,
    data,
  })

  const update = async ({
    userid,
    id,
    data,
  }) => store.item.update({
    userid,
    id,
    data,
  })

  const del = async ({
    userid,
    id,
  }) => store.item.delete({
    userid,
    id,
  })

  return {
    list,
    get,
    create,
    update,
    delete: del,
  }
}

module.exports = ItemController