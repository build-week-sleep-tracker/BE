# Sleep Tracker Backend

Sometimes you don't get enough sleep. Work life catches up on you and at the end of the week you're hours down on your sleep quoata. Sleep tracker aims to fix that. By making it easy to track your time in bed and give you recommendation on how much sleep you should be getting.

## Table of contents

* [Deployed app](#deployed-app)
* [Technologies used and dependencies](#built-with)
* [Installation](#installation)
* [Documentation](#documentation)
* [Environmental variables](#environmental-variables)
* [License](#license)

## Deployed API
The API has been been deployed to heroku [here](https://bw-sleep-tracker.herokuapp.com/api/)

## Built with

* Node.JS (CommonJS ES6)
* Express.js
* Knex
* PostgreSQL
* SQLite3 (testing DB)
* jsonwebtoken
* Jest
* Supertest
* Cors

## Installation

1. Fork the repository
2. Clone the repo
3. `npm install`
4. `npx knex migrate:latest`
5. Add any ENV variable neccasary (See Enviroment Variables)
6. `npm run start`

## Documentation

The endpoint documentation can be found [here](https://documenter.getpostman.com/view/7823015/SVYouL3w?version=latest)

## Environmental variables

Remember to set up the required environmental variables, especially when deploying on Heroku.

* `DB_ENV` = production (The knex configuration you will use for your database)
* `JWT_SECRET` The json web token secret key
* `DATABASE_URL` The database url used to connect to an external database in production
* `PORT` The listen port used by the Express.JS server

## License

[MIT License](LICENSE)