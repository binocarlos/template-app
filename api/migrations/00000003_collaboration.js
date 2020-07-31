const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('collaboration', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.enu('type', ['owner', 'editor']).notNullable()
      table.integer('useraccount')
        .references('id')
        .inTable('useraccount')
        .notNullable()
        .onDelete('cascade')
      table.integer('pool')
        .references('id')
        .inTable('pool')
        .notNullable()
        .onDelete('cascade')
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('collaboration')
  ])
}

module.exports = {
  up,
  down
}