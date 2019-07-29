
exports.up = function(knex) {
    return knex.schema.createTable('sleeps', tbl => {
        tbl.increments();
        tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        tbl.datetime('sleep_time').notNullable();
        tbl.datetime('wake_time').notNullable();
        tbl.integer('score_wake').unsigned();
        tbl.integer('score_day').unsigned();
        tbl.integer('score_sleep').unsigned();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sleeps');
};
