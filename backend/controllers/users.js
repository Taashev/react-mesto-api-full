const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { messageError } = require('../utils/constants');
const NotFoundError = require('../components/NotFoundError');
const ConflictError = require('../components/ConflictError');
const HttpError = require('../components/HttpError');

// login
const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const id = user._id;
      const token = jwt.sign(
        { id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7, // 7 дней
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      }).end();
    })
    .catch(next);
};

// logout
const logout = (req, res) => {
  res.status(200)
    .clearCookie('jwt')
    .send({ message: 'Покасики!' });
};

// create user
const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'Error') {
        return next(new HttpError(messageError.userValidationError));
      }

      if (err.code === 11000) {
        return next(new ConflictError('Этот email уже занят'));
      }

      return next(err);
    });
};

// get users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

// get user
const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user === null) {
        return next(new NotFoundError('Такого пользователя не существует'));
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new HttpError(messageError.userIdError));
      }

      return next(err);
    });
};

// get user info
const getUserInfo = (req, res, next) => {
  const userId = req.user.id;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

// update profile
const updateProfile = (req, res, next) => {
  const userId = req.user.id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!name || !about) {
        throw new HttpError(messageError.userValidationError);
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new HttpError(messageError.userValidationError));
      }

      return next(err);
    });
};

// update avatar
const updateAvatar = (req, res, next) => {
  const userId = req.user.id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!avatar) {
        throw new HttpError(messageError.userValidationError);
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new HttpError(messageError.userValidationError));
      }

      return next(err);
    });
};

// export
module.exports = {
  login,
  logout,
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateProfile,
  updateAvatar,
};
