// const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user.model');

describe('Auth Model Test', () => {

  test('Deve cadastrar um novo usuário', () => {
    return request(app)
      .post('/auth/register')
      .send({ name: 'John Doe', email: 'johndoe@email.com', password: '123456', confirmPassword: '123456', birthDate: '04/20/1995' })
      .then(async (res) => {
        expect(res.status).toBe(201);
        expect(res.body.user.name).toBe('John Doe');
        await User.findOneAndDelete({ _id: res.body.user._id });
      });
  });

  test('Deve retornar o erro de senha incorreta ao tentar salvar um novo usuário', () => {
    return request(app)
      .post('/auth/register')
      .send({ name: 'John Doe', email: 'johndoe@email.com', password: '123456', confirmPassword: '654321', birthDate: '04/20/1995' })
      .then((res) => {
        expect(res.status).toBe(400)
      })
  });
});
