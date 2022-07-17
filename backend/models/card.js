const mongoose = require('mongoose');
const { regexUrl } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return regexUrl.test(url);
      },
      message: 'Некорректный url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    reqired: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
