const AppError = require('./AppError');

class InternalError extends AppError {
  constructor(error) {
    super(error.message, 500);
    this.data = { error };
  }
}

module.exports = InternalError;
