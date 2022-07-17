const regexUrl = /^(http[s]:\/\/)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+(\.[a-zA-Z]{2,}([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=])*)/;

const messageError = {
  userValidationError: 'Переданы некорректные данные пользователя',
  userIdError: 'Некорректный id пользователя',
  cardValidationError: 'Переданы некорректные данные карточки',
  cardIdError: 'Некорректный id карточки',
  cardNotFound: 'Такой карточки нет',
  authError: 'Необходима авторизация',
};

module.exports = {
  regexUrl,
  messageError,
};
