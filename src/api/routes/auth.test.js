const request = require('supertest');
const db = require('../../database/dbConfig');
const UsersModel = require('../models/usersModel');
const server = require('../server');

beforeEach(() => db('users').truncate());

describe('Register and login users', () => {
  test('Can register user', async () => {
    const res = await request(server)
      .post('/api/register')
      .send({ email: 'test', password: '1234' })
      .expect(200);
    const users = await UsersModel.getAll();
    expect(users).toHaveLength(1);
    expect(res.body.user).toEqual({ id: 1, email: 'test' });
  });

  test('Can login user and returns user', async () => {
    await request(server)
      .post('/api/register')
      .send({ email: 'test', password: '1234' })
      .expect(200);
    const res = await request(server)
      .post('/api/login')
      .send({ email: 'test', password: '1234' })
      .expect(200);
    expect(res.body.user).toEqual({ id: 1, email: 'test' });
  });
});
