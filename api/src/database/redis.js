const IORedis = require('ioredis')
const settings = require('../settings')

const Redis = () => {
  return new IORedis(settings.databases.redis)
}

module.exports = Redis