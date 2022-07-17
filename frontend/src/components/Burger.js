import React from "react";

function Burger({ stateMenu, onClick }) {
  return (
    <div className={ `burger hover ${ stateMenu ? 'burger_active' : '' }` } onClick={ onClick }>
      <span className="burger__item"></span>
      <span className="burger__item"></span>
      <span className="burger__item"></span>
    </div>
  )
}

export default Burger;
