// import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// import my modules
const login = require('./routes/login');
const logout = require('./routes/logout');
const createUser = require('./routes/createUser');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { handleError, notFound } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: [
    'localhost:3000',
    'localhost:3001',
    'http://localhost:3000',
    'http://localhost:3001',
    'mesto.taashev.nomoredomains.xyz',
    'http://mesto.taashev.nomoredomains.xyz',
    'https://mesto.taashev.nomoredomains.xyz',
  ],
  credentials: true,
};

// connect mestodb
mongoose.connect('mongodb://localhost:27017/mestodb');

// app express
const app = express();

// PORT
const { PORT = 3000 } = process.env;

// reqest logger
app.use(requestLogger);

// cors
app.use('*', cors(options));

// cookie parser
app.use(cookieParser());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// create user
app.use('/signup', createUser);

// login
app.use('/signin', login);

// logout
app.use('/signout', logout);

// authorization
app.use(auth);

// users
app.use('/users', users);

// cards
app.use('/cards', cards);

// error logger
app.use(errorLogger);

// errors
app.use(errors());

// error handler
app.use('*', notFound);
app.use(handleError);

app.listen(PORT);
