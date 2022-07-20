const jwt = require('jsonwebtoken');
const Unauthorized = require('../components/UnauthorizedError');

const auth = (req, res, next) => {
  const { cookie } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;
  const authError = new Unauthorized('Необходима авторизация');

  if (!cookie || !cookie.startsWith('jwt=')) {
    return next(authError);
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return next(authError);
  }

  req.user = payload;

  return next();
};

module.exports = auth;
