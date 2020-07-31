const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('lease', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.specificType('created_at', 'timestamp default now()')
      table.specificType('updated_at', 'timestamp default now()')
      table.integer('pool')
        .references('id')
        .inTable('pool')
        .notNullable()
        .onDelete('cascade')
      table.integer('vm')
        .references('id')
        .inTable('vm')
        .onDelete('cascade')
      table.string('status').notNullable()
      table.text('kubeconfig')
      table.json('meta')
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('lease')
  ])
}

module.exports = {
  up,
  down
}