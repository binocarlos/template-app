const harness = require('../harness')

harness('auth:register', async (t, {
  getClient,
}) => {

  const email = 'test@test.com'
  const password = 'password'

  const client = getClient()
  const statusRes = await client.get('/auth/status')
  t.equal(statusRes.status, 200, `200 status`)
  t.notOk(statusRes.data, `no current login`)
  const registerRes = await client.post('/auth/register', {
    email,
    password,
  })
  t.equal(registerRes.status, 201, `201 status`)
  console.dir(registerRes.data)
}, {
  web: true,
})
