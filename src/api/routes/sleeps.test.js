const session = require('supertest-session');
const db = require('../../database/dbConfig');
const server = require('../server');

beforeEach(() => db('sleeps')
  .truncate()
  .then(() => db('users').truncate()));

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
      .expect(201);
    expect(res.body.user_id).toBe(1);
  });

  test('Can get all sleeps for user', async () => {
    await authedSession(server)
      .post('/api/sleeps')
      .send({ sleep_time: '2019-07-29T21:53:00' })
      .expect(201);
    const res = await authedSession(server)
      .get('/api/sleeps')
      .expect(200);
    expect(res.body).toHaveLength(1);
  });
});
