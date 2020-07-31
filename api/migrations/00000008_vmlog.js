const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('vmlog', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.specificType('created_at', 'timestamp default now()')
      table.integer('vm')
        .references('id')
        .inTable('vm')
        .notNullable()
        .onDelete('cascade')
      table.text('text').notNullable()
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('vmlog')
  ])
}

module.exports = {
  up,
  down
}