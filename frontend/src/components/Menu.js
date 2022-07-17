import React from "react";
import { Link } from "react-router-dom";

function Menu({ stateMenu, email, onSignOut}) {
  return (
    <nav className={ `menu ${ stateMenu ? 'menu_open' : '' }` }>
      <span className="menu__email">{ email || 'email@mail.com' }</span>
      <Link className="menu__link hover" to="/sign-in" onClick={ onSignOut }>Выйти</Link>
    </nav>
  )
}

export default Menu;
