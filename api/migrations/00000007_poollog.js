const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('poollog', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.specificType('created_at', 'timestamp default now()')
      table.integer('pool')
        .references('id')
        .inTable('pool')
        .notNullable()
        .onDelete('cascade')
      table.text('text').notNullable()
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('poollog')
  ])
}

module.exports = {
  up,
  down
}