const harness = require('../harness')

harness('auth:register', async (t, {
  getClient,
}) => {

  const email = 'test@test.com'
  const password = 'password'

  // initial status with no login
  const noLoginStatusRes = await getClient().get('/auth/status')
  t.equal(noLoginStatusRes.status, 200, `200 status`)
  t.notOk(noLoginStatusRes.data, `no current login`)

  // register account
  const registerRes = await getClient().post('/auth/register', {
    email,
    password,
  })
  t.equal(registerRes.status, 201, `201 status`)
  t.ok(registerRes.data.token, `there is a token in the register response`)
  
  // // login
  // const loginRes = await getClient().post('/auth/login', {
  //   email,
  //   password,
  // })
  // t.equal(loginRes.status, 200, `200 status`)
  // t.ok(loginRes.data.token, `there is a token in the login response`)

  // // register failure - existing account
  // const registerExistingRes = await getClient().post('/auth/register', {
  //   email,
  //   password,
  // })
  // t.equal(registerExistingRes.status, 400, `400 status`)

  // // status with token
  // const loginStatusRes = await getClient({
  //   token: loginRes.data.token,
  // }).get('/auth/status')
  // t.equal(loginStatusRes.status, 200, `200 status`)
  // t.ok(loginStatusRes.data, `have current login`)

  // // re-generate token
  // const tokenRes = await getClient({
  //   token: loginRes.data.token,
  // }).post('/auth/token')
  // t.equal(tokenRes.status, 201, `201 status`)
  // t.ok(tokenRes.data.token, `have current login`)

  // // new token status
  // const newTokenStatusRes = await getClient({
  //   token: tokenRes.data.token,
  // }).get('/auth/status')
  // t.equal(newTokenStatusRes.status, 200, `200 status`)
  // t.ok(newTokenStatusRes.data, `have current login`)

}, {
  web: true,
})
