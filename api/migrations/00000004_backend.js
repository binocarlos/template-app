const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('backend', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.specificType('created_at', 'timestamp default now()')
      table.json('meta')
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('backend')
  ])
}

module.exports = {
  up,
  down
}