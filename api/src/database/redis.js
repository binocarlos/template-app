const IORedis = require('ioredis')

const Redis = (options) => {
  return new IORedis(options)
}

module.exports = Redis