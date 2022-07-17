// import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

// import my modules
const login = require('./routes/login');
const createUser = require('./routes/createUser');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { handleError, notFound } = require('./middlewares/handleError');

// connect mestodb
mongoose.connect('mongodb://localhost:27017/mestodb');

// app express
const app = express();

// PORT 3000
const { PORT = 3000 } = process.env;

// cookie parser
app.use(cookieParser());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create user
app.use('/signup', createUser);

// login
app.use('/signin', login);

// authorization
app.use(auth);

// users
app.use('/users', users);

// cards
app.use('/cards', cards);

// errors
app.use(errors());

// error handler
app.use('*', notFound);
app.use(handleError);

app.listen(PORT);
