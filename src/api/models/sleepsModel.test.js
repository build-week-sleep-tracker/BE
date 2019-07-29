const db = require('../../database/dbConfig');
const SleepsModel = require('./sleepsModel');

beforeEach(() => db('sleeps')
  .truncate()
  .then(() => db('users').truncate()));

async function createTestUser(email = 'test') {
  await db('users').insert({ email, password: '1234' });
}

describe('Adding and manipulation sleeps table', () => {
  test('Can add sleep and returns sleep', async () => {
    await createTestUser();
    const sleep = await SleepsModel.insert({ user_id: 1, sleep_time: '2019-07-29T21:53:00' });
    const sleeps = await SleepsModel.getAll();
    expect(sleeps).toHaveLength(1);
    expect(sleep).toBeDefined();
  });

  test('Can update sleep and returns sleep', async () => {
    await createTestUser();
    const sleep = await SleepsModel.insert({ user_id: 1, sleep_time: '2019-07-29T21:53:00' });
    const sleep2 = await SleepsModel.update(sleep.id, { wake_time: '2019-07-30T7:53:00' });
    expect(sleep).not.toEqual(sleep2);
    expect(sleep2).toHaveProperty('wake_time', '2019-07-30T7:53:00');
  });

  test('Can delete sleep and returns old sleep', async () => {
    await createTestUser();
    const sleep = await SleepsModel.insert({ user_id: 1, sleep_time: '2019-07-29T21:53:00' });
    const sleep2 = await SleepsModel.remove(sleep.id);
    const sleeps = await SleepsModel.getAll();
    expect(sleep).toEqual(sleep2);
    expect(sleeps).toHaveLength(0);
  });

  test('Can get sleeps by user', async () => {
    await createTestUser();
    await createTestUser('test2');
    await SleepsModel.insert({ user_id: 1, sleep_time: '2019-07-29T21:53:00' });
    await SleepsModel.insert({ user_id: 2, sleep_time: '2019-07-29T21:53:00' });
    await SleepsModel.insert({ user_id: 2, sleep_time: '2019-07-29T21:53:00' });
    const sleeps = await SleepsModel.findByUser(2);
    expect(sleeps).toHaveLength(2);
  });
});
