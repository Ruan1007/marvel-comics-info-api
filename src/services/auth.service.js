/**
 * Arquivo: src/services/auth.service.js
 * Descrição: arquivo responsável pelas regras de negócio da autenticação.
 */

const User = require('../models/user.model');
const { BadRequestError } = require('../utils/HandleError');
const userService = require('../services/user.service');
const bcrypt = require('bcryptjs');

module.exports = {
  async signUp(user) {
    await validateRegistration(user)
    const userRecord = await User.create(user);
    userRecord.password = undefined;
    return userRecord;
  },

  async login({ email, password }) {
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        throw new BadRequestError('Usuário não encontrado');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestError('Senha inválida');
      }

      user.password = undefined;
      return user;
    } catch (err) {
      throw new BadRequestError(err);
    }
  },

  async resetPassword({ email }) {
    try {
      let user = await userService.getByEmail(email);
      if (!user) {
        throw new NotFoundError('Usuário não encontrado');
      }

      let password = randomPassword(8);
      const hash = await bcrypt.hash(password, 10);
      const filter = { email: user.email };
      user = await User.findOneAndUpdate(filter, { password: hash });
      await emailService(
        user.email,
        'reset-password',
        { password: password },
        'Senha resetada'
      );
    } catch (err) {
      throw new BadRequestError(err);
    }
  }
};

const validateRegistration = async (user) => {
  const { name, email, password, confirmPassword } = user;
  if (!name) {
    throw new BadRequestError('Nome não pode ser vazio');
  }
  if (await userService.getByEmail(email)) {
    throw new BadRequestError('Esse email já está cadastrado');
  }
  if (password.localeCompare(confirmPassword) != 0) {
    throw new BadRequestError('Senha informada diferente da confirmação de senha');
  }
};

const randomPassword = (len) => {
  let password = '';
  do {
    password += Math.random().toString(36).substr(2);
  } while (password.length < len);
  password = password.substr(0, len);
  return password;
};
