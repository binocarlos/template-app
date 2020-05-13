const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('useraccount', function(table) {
      table.specificType('id', 'serial primary key not null')
      table.specificType('created_at', 'timestamp default now()')
      table.string('email').unique().notNullable()
      table.string('hashed_password').notNullable()
      table.string('tags')
      table.json('meta')
    })
  ])
}

const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('useraccount')
  ])
}

module.exports = {
  up,
  down
}