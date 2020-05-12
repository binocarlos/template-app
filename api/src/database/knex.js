const Knex = require('knex')
const KnexFactory = (options) => Knex(options)
module.exports = KnexFactory