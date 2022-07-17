const NotFoundError = require('../components/NotFoundError');

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
};

const notFound = (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
};

module.exports = {
  handleError,
  notFound,
};
