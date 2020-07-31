const PoolController = ({
  store,
}) => {
  
  const list = async ({
    
  } = {}) => {

    const pools = await store.pool.list({
    
    })

    const vms = await store.vm.list({
    
    })

    const leases = await store.lease.list({
    
    })

    const poolMap = pools.reduce((all, pool) => {
      pool.vms = []
      pool.leases = []
      all[pool.id] = pool
      return all
    }, {})

    vms.forEach(vm => {
      const pool = poolMap[vm.pool]
      pool.vms.push(vm)
    })

    leases.forEach(lease => {
      const pool = poolMap[lease.pool]
      pool.leases.push(lease)
    })

    return pools
  }

  const get = async ({
    id,
  }) => store.pool.get({
    id,
  })

  const create = async ({
    data,
  }) => store.pool.create({
    data,
  })

  const update = async ({
    id,
    data,
  }) => store.pool.update({
    id,
    data,
  })

  const del = async ({
    id,
  }) => store.pool.delete({
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

module.exports = PoolController