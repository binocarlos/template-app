const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('vm', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.specificType('created_at', 'timestamp default now()')
      table.integer('pool')
        .references('id')
        .inTable('pool')
        .notNullable()
        .onDelete('cascade')
      table.string('status').notNullable()
      table.json('meta')
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('vm')
  ])
}

module.exports = {
  up,
  down
}