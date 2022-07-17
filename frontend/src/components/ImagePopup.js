import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose, onCloseOverlay }) {
  return (
    <Popup
      popupType="fullscreen"
      classNameContainer="popup__container-fullscreen"
      classNameTitle="popup__title_invisible"
      isOpen={card?.link}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
    >
      <img className="popup__full-img" src={card?.link} alt={card?.name} />
      <h2 className="popup__full-text">{card?.name}</h2>
    </Popup>
  );
}

export default ImagePopup;
