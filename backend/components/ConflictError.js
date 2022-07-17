const HttpError = require('./HttpError');

class ConflictError extends HttpError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;
