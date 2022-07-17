const HttpError = require('./HttpError');

class ForbiddenError extends HttpError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = 'Forbidden';
  }
}

module.exports = ForbiddenError;
