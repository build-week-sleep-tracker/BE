require('dotenv').config();

const localConnection = {
    host: 'localhost',
    database: 'my_db',
    user: 'username',
    password: 'password'
};

const dbConnection = process.env.DATABASE_URL || localConnection;

module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './src/database/sleep-tracker.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        },
        pool: {
          afterCreate: (conn, done) => {
            // runs after a connection is made to the sqlite engine
            conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
          },
        },
    },
    testing: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './src/database/test.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        },
        pool: {
          afterCreate: (conn, done) => {
            // runs after a connection is made to the sqlite engine
            conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
          },
        },
    },
    production: {
        client: 'pg',
        connection: dbConnection,
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        }
    }
};