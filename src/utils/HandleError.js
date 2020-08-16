/**
 * Arquivo: src/utils/HandleError.js
 * Descrição: arquivo responsável pelas organização das classes de erro.
 */

class AppError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }
}

class NotFoundError extends AppError {
  constructor(resource, query) {
    super(`O dado ${resource} informado não foi encontrado`, 404);
    this.data = {resource, query};
  }
}

class InternalError extends AppError {
  constructor(error) {
    super(error.message, 500);
    this.data = {error};
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = {AppError, NotFoundError, InternalError, BadRequestError};
