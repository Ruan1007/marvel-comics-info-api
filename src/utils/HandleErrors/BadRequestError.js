/**
 * Arquivo: src/utils/HandleError.js
 * Descrição: arquivo responsável pelas organização das classes de erro.
 */
const AppError = require('./AppError');

class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequestError;
