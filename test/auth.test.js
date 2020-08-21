const mongoose = require('mongoose');

const dbHandler = require('./db-handle');
const authService = require('../src/services/auth.service');
const BadRequestError = require('../src/utils/HandleErrors/BadRequestError');

const userComplete = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: '123456',
  confirmPassword: '123456',
  birthDate: '04/20/1995',
};

const userMissingEmail = {
  name: 'John Doe',
  password: '123456',
  confirmPassword: '123456',
  birthDate: '04/20/1995',
};

const userMissingName = {
  email: 'johndoe@email.com',
  password: '123456',
  confirmPassword: '123456',
  birthDate: '04/20/1995',
};

const userWrongPassword = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: '123456',
  confirmPassword: '654321',
  birthDate: '04/20/1995',
};

describe('Auth Model Test', () => {
  /**
   * Connect em um novo in-memory database antes de rodar qualquer teste
   */
  beforeAll(async () => {
    await dbHandler.connect();
  });

  /**
   * Limpa toda a data depois de cada teste
   */
  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  /**
   * Remove e fecha o db e o server.
   */
  afterAll(async () => {
    await dbHandler.closeDatabase();
  });

  it('Deve cadastrar um novo usuário', async () => {
    expect(async () => {
      await authService.signUp(userComplete);
    }).not.toThrow;
  });

  it('Não pode criar sem email', async () => {
    await expect(authService.signUp(userMissingEmail)).rejects.toThrow(
      mongoose.Error.ValidationError
    );
  });

  it('Não pode criar sem nome', async () => {
    const message = 'Nome não pode ser vazio';
    try {
      await authService.signUp(userMissingName);
    } catch (err) {
      expect(err.code).toBe(400);
      expect(err.message).toBe(message);
    }
  });

  it('Não pode criar ter senha errada', async () => {
    const message = 'Senha informada diferente da confirmação de senha';
    try {
      await authService.signUp(userWrongPassword);
    } catch (err) {
      expect(err.code).toBe(400);
      expect(err.message).toBe(message);
    }
  });
});
