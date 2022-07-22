const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { message: 'Сервер устал... дайте ему пару секунд' },
});

module.exports = limiter;
