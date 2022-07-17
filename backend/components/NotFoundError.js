const HttpError = require('./HttpError');

class NotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFound';
  }
}

module.exports = NotFoundError;
