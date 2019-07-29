const db = require('../database/dbConfig');
const SleepsModel = require('./sleepsModel');

beforeEach(() => {
  return db('sleeps')
    .truncate()
    .then(() => db('users').truncate());
});

describe('Adding and manipulation sleeps table', () => {
  test('Can add sleep', async (done) => {
    await db('users').insert({ email: 'test', password: '1234' });
    await SleepsModel.insert({ user_id: 1, sleep_time: '2019-07-29T21:53:00' });
    const sleeps = await SleepsModel.getAll();
    expect(sleeps).toHaveLength(1);
    done();
  });
});
