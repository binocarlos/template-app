const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('pool', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.specificType('created_at', 'timestamp default now()')
      table.string('name').notNullable()
      // this is public or private
      table.string('type').notNullable()
      table.string('pool_config_hash').notNullable()
      table.string('vm_config_hash').notNullable()
      table.json('config')
      table.json('meta')
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('pool')
  ])
}

module.exports = {
  up,
  down
}