const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(resource, query) {
    super(`O dado ${resource} informado não foi encontrado`, 404);
    this.data = { resource, query };
  }
}

module.exports = NotFoundError;
