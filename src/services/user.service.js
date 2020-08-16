/**
 * Arquivo: src/services/user.service.js
 * Descrição: arquivo responsável pelas regras de negócios do usuário.
 */
const User = require('../models/user.model');

module.exports = {
  async getByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }
};
