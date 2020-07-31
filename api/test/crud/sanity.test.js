const harness = require('../harness')

harness('crud:sanity', async (t, {
  getClient,
}) => {

  // register account
  const listPoolRes1 = await getClient().get('/pools')

  console.log('--------------------------------------------')
  console.log('empty list')
  console.dir(listPoolRes1.status)
  console.dir(listPoolRes1.data)

  const createPoolRes = await getClient().post('/pools', {
    name: 'hello',
    type: 'thing',
    pool_config_hash: 'abc',
    vm_config_hash: 'abc',
    config: {},
    meta: {},
  })

  const pool = createPoolRes.data

  console.log('--------------------------------------------')
  console.log('create')
  console.dir(createPoolRes.status)
  console.dir(createPoolRes.data)

  const listPoolRes2 = await getClient().get('/pools')

  console.log('--------------------------------------------')
  console.log('after create list list')
  console.dir(listPoolRes2.status)
  console.dir(listPoolRes2.data)

  const createVmRes = await getClient().post(`/pools/${pool.id}/vms`, {
    status: 'hello',
    meta: {},
  })

  const vm = createVmRes.data

  console.log('--------------------------------------------')
  console.dir(createVmRes.data)

  const createLeaseNoVmRes = await getClient().post(`/pools/${pool.id}/leases`, {
    status: 'hello',
    kubeconfig: 'kubeconfig',
    meta: {},
  })

  const createLeaseVmRes = await getClient().post(`/pools/${pool.id}/leases`, {
    vm: vm.id,
    status: 'hello',
    kubeconfig: 'kubeconfig',
    meta: {},
  })

  const finalList = await getClient().get('/pools')

  console.log(JSON.stringify(finalList.data, null, 4))
  
  
}, {
  web: true,
})
