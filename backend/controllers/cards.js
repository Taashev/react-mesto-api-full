const Card = require('../models/card');
const { messageError } = require('../utils/constants');
const NotFoundError = require('../components/NotFoundError');
const ForbiddenError = require('../components/ForbiddenError');
const HttpError = require('../components/HttpError');

// get cards
const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

// create card
const createCard = (req, res, next) => {
  const owner = req.user.id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new HttpError(messageError.cardValidationError));
      }

      return next(err);
    });
};

// delete card
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(messageError.cardNotFound));
      }

      const owner = card.owner.toString();
      const userId = req.user.id;

      if (owner !== userId) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }

      return Card.findByIdAndRemove(cardId)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new HttpError(messageError.cardIdError));
          }

          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new HttpError(messageError.cardIdError));
      }

      return next(err);
    });
};

// like card
const likeCard = (req, res, next) => {
  const userId = req.user.id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(messageError.cardNotFound));
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new HttpError(messageError.cardIdError));
      }

      return next(err);
    });
};

// dislike card
const dislikeCard = (req, res, next) => {
  const userId = req.user.id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(messageError.cardNotFound));
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new HttpError(messageError.cardIdError));
      }

      return next(err);
    });
};

// export
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
