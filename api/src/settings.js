const fs = require('fs')

const required_env = [
  'POSTGRES_USER',
  'POSTGRES_DB',
  'POSTGRES_PASSWORD',
  'JWT_SECRET_KEY',
  'GOOGLE_STORAGE_SERVICE_ACCOUNT',
  'GOOGLE_STORAGE_BUCKET_NAME',
  'GOOGLE_STORAGE_BUCKET_PREFIX',
]

const decodeBase64_env = [
  'google_storage_service_account',
]

const decodeJSON_env = [
  'google_storage_service_account',
]

const missing_env = required_env.filter(name => process.env[name] ? false : true)

if(missing_env.length>0) {
  console.error(`The following variables are required:

${missing_env.join("\n")}
`)

  process.exit(1)
}

const args = require('minimist')(process.argv, {
  default:{

    // web server config
    port: process.env.PORT || 80,
    base: process.env.BASE || '/api/v1',

    // databases
    postgreshost: process.env.POSTGRES_SERVICE_HOST || 'postgres',
    postgresport: process.env.POSTGRES_SERVICE_PORT || 5432,
    postgresuser: process.env.POSTGRES_USER,
    postgrespassword: process.env.POSTGRES_PASSWORD,
    postgresdatabase: process.env.POSTGRES_DB,
    redishost: process.env.REDIS_SERVICE_HOST || 'redis',
    redisport: process.env.REDIS_SERVICE_PORT || 6379,

    // security
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_expiry: process.env.JWT_EXPIRY || '1h',
    salt_rounds: process.env.SALT_ROUNDS || 10,

    // google storage
    google_storage_service_account: process.env.GOOGLE_STORAGE_SERVICE_ACCOUNT,
    google_storage_credentials_file: '/creds.json',
    google_storage_bucket_name: process.env.GOOGLE_STORAGE_BUCKET_NAME,
    google_storage_bucket_prefix: process.env.GOOGLE_STORAGE_BUCKET_PREFIX,
  }
})

const databases = {
  redis: {
    host: args.redishost,
    port: args.redisport,
    family: 4,
  },
  postgres: {
    client: 'pg',
    connection: {
      host: args.postgreshost,
      port: args.postgresport,
      user: args.postgresuser,
      password: args.postgrespassword,
      database: args.postgresdatabase
    },
    pool: {
      min: 2,
      max: 10
    }
  },
}

args.databases = databases

decodeBase64_env.forEach(name => {
  args[name] = Buffer.from(args[name], 'base64').toString()
})

decodeJSON_env.forEach(name => {
  args[name] = JSON.parse(args[name])
})

if(args.google_storage_service_account) {
  fs.writeFileSync(args.google_storage_credentials_file, JSON.stringify(args.google_storage_service_account, null, 4))
}

module.exports = args