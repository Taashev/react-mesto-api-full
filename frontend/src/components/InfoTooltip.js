import React from "react";
import Popup from "./Popup";
import Valid from "../images/valid.png";
import Invalid from "../images/invalid.png";

function InfoTooltip({ config, onClose, onCloseOverlay }) {
  return (
    <Popup
      popupType="info"
      classNameContainer="popup__container popup__container_type_info"
      title={config.message}
      classNameTitle="popup__title_type_info"
      isOpen={config.isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
    >
      <img className="popup__images" src={config.status ? Valid : Invalid} alt={config.status ? "Успешно" : config.message} />
    </Popup>
  );
}

export default InfoTooltip;
