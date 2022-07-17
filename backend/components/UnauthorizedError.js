const HttpError = require('./HttpError');

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'Unauthorized';
  }
}

module.exports = UnauthorizedError;
