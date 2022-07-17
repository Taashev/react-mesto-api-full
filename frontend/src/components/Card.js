import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { _id: userId } = useContext(CurrentUserContext);

  const isOwn = card.owner._id === userId;

  const isLiked = card.likes.some(id => id._id === userId);
  const cardLikeButtonClassName = isLiked ? 'card__like_active' : '';

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li key={ card._id } className="card__item">
      { isOwn && <button className="card__trash hover" type="button" aria-label="удалить карточку" onClick={ handleDeleteClick }></button> }
      <img className="card__img" src={ card.link } alt={ card.name } onClick={ handleCardClick }/>
      <div className="card__footer">
        <h2 className="card__text">{ card.name }</h2>
        <div className="card__like-wraper">
          <button className={ `card__like ${ cardLikeButtonClassName }` } type="button" aria-label="лайк" onClick={ handleLikeClick }></button>
          <span className="card__counter">{ card.likes.length }</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
