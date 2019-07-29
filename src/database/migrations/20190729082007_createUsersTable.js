exports.up = function migrate(knex) {
	return knex.schema.createTable('users', (tbl) => {
		tbl.increments();
		tbl
			.string('email', 128)
			.unique()
			.notNullable();
		tbl.string('password', 512).notNullable();
	});
};

exports.down = function rollback(knex) {
	return knex.schema.dropTableIfExists('users');
};
