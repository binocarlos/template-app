const LeaseController = ({
  store,
}) => {
  
  const list = async ({
    query,
  } = {}) => store.lease.list(query)
    
  const get = async ({
    query,
  } = {}) => store.lease.get(query)

  const create = async ({
    data,
  }) => store.lease.create({
    data,
  })

  const update = async ({
    query,
    data,
  }) => store.lease.update({
    query,
    data,
  })

  const del = async ({
    query,
  }) => store.lease.delete({
    query,
  })

  return {
    list,
    get,
    create,
    update,
    delete: del,
  }
}

module.exports = LeaseController