const VmController = ({
  store,
}) => {
  
  const list = async ({
    query,
  } = {}) => store.vm.list(query)
    
  const get = async ({
    query,
  } = {}) => store.vm.get(query)

  const create = async ({
    data,
  }) => store.vm.create({
    data,
  })

  const update = async ({
    query,
    data,
  }) => store.vm.update({
    query,
    data,
  })

  const del = async ({
    query,
  }) => store.vm.delete({
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

module.exports = VmController