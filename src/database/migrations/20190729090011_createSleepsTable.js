exports.up = function migrate(knex) {
  return knex.schema.createTable('sleeps', (tbl) => {
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.datetime('sleep_time').notNullable();
    tbl.datetime('wake_time');
    tbl.float('score').unsigned();
  });
};

exports.down = function rollback(knex) {
  return knex.schema.dropTableIfExists('sleeps');
};
