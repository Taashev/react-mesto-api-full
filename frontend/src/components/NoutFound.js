import React from "react";
import { Link } from "react-router-dom";
import Error from '../images/404.png';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <img className="not-found__image" src={ Error } alt="Страница не найдена" />
        <h2 className="not-found__title">Ой!</h2>
        <p className="not-found__text">Похоже, мы не можем найти нужную вам страницу</p>
        <Link className="not-found__link hover" to="/">На главную</Link>
      </div>
    </div>
  )
}

export default NotFound;
