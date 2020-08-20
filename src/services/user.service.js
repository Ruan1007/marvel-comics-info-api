/**
 * Arquivo: src/services/user.service.js
 * Descrição: arquivo responsável pelas regras de negócios do usuário.
 */
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports = {
  async getByEmail(email) {
    const user = await User.findOne({email});
    return user;
  },
  async update(user, userId) {
    await validatePasswordUpdate(user, userId);
    return await User.findOneAndUpdate({_id: userId}, user, {new: true});
  }
};

const validatePasswordUpdate = async (user, userId) => {
  if (user.oldPassword && (!user.newPassword || !user.confirmNewPassword)) {
    throw new BadRequestError('Senha inválida');
  }

  if (user.oldPassword && user.newPassword && user.confirmNewPassword) {
    const userDB = await User.findOne({_id: userId}).select('+password');
    if (!(await bcrypt.compare(user.oldPassword, userDB.password))) {
      throw new BadRequestError('Senha inválida');
    }

    if (user.newPassword.localeCompare(user.confirmNewPassword) != 0) {
      throw new BadRequestError(
        'Senha informada diferente da confirmação de senha'
      );
    }
  }
};
