const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('bookingform', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.specificType('created_at', 'timestamp default now()')
      table.integer('useraccount')
        .references('id')
        .inTable('useraccount')
        .notNullable()
        .onDelete('cascade')
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.text('config').notNullable()
      table.json('meta')
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('bookingform')
  ])
}

module.exports = {
  up,
  down
}