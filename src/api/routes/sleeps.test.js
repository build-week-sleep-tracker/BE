const session = require('supertest-session');
const db = require('../../database/dbConfig');
const SleepsModel = require('../models/sleepsModel');
const UsersModel = require('../models/usersModel');
const server = require('../server');

beforeEach(() => db('sleeps')
  .truncate()
  .then(() => db('users').truncate()));

async function createTestUser(email = 'test') {
  await db('users').insert({ email, password: '1234' });
}

describe('Add and manipulate sleeps for users', () => {
  let authedSession = null;

  beforeEach((done) => {
    const testSession = session(server);
    authedSession.post('/register')
      .send({ username: 'test', password: '1234' })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        authedSession = testSession;
        return done();
      });
  });

  test('Can add sleep to user', async () => {
    const res = await authedSession(server)
      .post('/api/sleeps')
      .send({ sleep_time: '2019-07-29T21:53:00' })
      .expect(200);
    expect(res.body.user_id).toBe(1);
  });
});
