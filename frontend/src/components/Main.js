import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Header from './Header';
import Burger from './Burger';
import Menu from './Menu';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  email,
  onSignOut,
  stateMenu,
  onBurgerClick
}) {
  const { avatar, name, about } = useContext(CurrentUserContext);

  return (
    <>
      <Header stateMenu={ stateMenu }>
        <Menu stateMenu={ stateMenu } email={ email } onSignOut={ onSignOut } />
        <Burger stateMenu={ stateMenu } onClick={ onBurgerClick } />
      </Header>
      <main className="content">
        {/* profile */}
        <section className="profile">
          <div className="profile__img-wraper" onClick={ onEditAvatar }>
            <img className="profile__img" src={ avatar || '#' } alt="Аватарка" />
          </div>
          <div className="profile__info">
            <h1 className="profile__user-name">{ name || '...' }</h1>
            <button className="profile__edit-btn hover" type="button" aria-label="редактировать профиль" onClick={ onEditProfile }></button>
            <p className="profile__user-about">{ about || '...' }</p>
          </div>
          <button className="profile__add-btn hover" onClick={ onAddPlace } type="button" aria-label="добавить новое фото"></button>
        </section>
        {/* cards */}
        <section className="card">
          <ul className="card__items">
            {cards.map((card) => <Card card={ card } key={ card._id } onCardClick={ onCardClick } onCardLike={ onCardLike } onCardDelete={ onCardDelete } />)}
          </ul>
        </section>
      </main>
    </>
  )
}

export default Main;
