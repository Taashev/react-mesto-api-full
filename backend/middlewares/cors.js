const allowedCors = [
  'http://localhost:3000',
  'localhost:3000',
  'http://localhost:3001',
  'localhost:3001',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

  if (method === 'OPTIONS') {
    res
      .header('Access-Control-Allow-Origin', origin)
      .header('Access-Control-Allow-Credentials', true)
      .header('Access-Control-Allow-Method', DEFAULT_ALLOWED_METHODS)
      .header('Access-Control-Allow-Headers', requestHeaders)
      .end();
  }

  if (allowedCors.includes(origin)) {
    res
      .header('Access-Control-Allow-Origin', origin)
      .header('Access-Control-Allow-Credentials', true)
      .end();
  }

  next();
};

module.exports = {
  cors,
};
