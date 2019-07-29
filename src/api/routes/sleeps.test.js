const session = require('supertest-session');
const db = require('../../database/dbConfig');
const server = require('../server');

beforeEach(() => db('sleeps')
  .truncate()
  .then(() => db('users').truncate()));

describe('Add and manipulate sleeps for users', () => {
  let authedSession = null;

  beforeEach(async () => {
    authedSession = session(server);
    await authedSession.post('/api/register')
      .send({ email: 'test', password: '1234' })
      .expect(200);
  });

  test('Can add sleep to user', async () => {
    const res = await authedSession
      .post('/api/sleeps')
      .send({ sleep_time: '2019-07-29T21:53:00' })
      .expect(201);
    expect(res.body.user_id).toBe(1);
  });

  test('Can get all sleeps for user', async () => {
    await authedSession
      .post('/api/sleeps')
      .send({ sleep_time: '2019-07-29T21:53:00' })
      .expect(201);
    const res = await authedSession
      .get('/api/sleeps')
      .expect(200);
    expect(res.body).toHaveLength(1);
  });
});
