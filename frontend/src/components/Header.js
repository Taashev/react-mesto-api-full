import React from 'react';
import logo from '../images/logo.svg';

function Header({ stateMenu, children }) {
  return (
    <header className={ `header ${ stateMenu ? 'header_open' : '' }` }>
      <img className="logo" src={ logo } alt="логотип 'Mesto'" />
      { children }
    </header>
  );
}

export default Header;
