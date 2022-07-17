import React, { useEffect } from "react";

function Popup({ popupType, classNameContainer='popup__container', classNameTitle='', title, isOpen, onClose, onCloseOverlay, children }) {
  useEffect(() => {
    if(!isOpen) return;

    function handleESC(e) {
      if(e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keyup', handleESC);

    return () => document.removeEventListener('keyup', handleESC)
  }, [isOpen])

  return (
    <div className={`popup popup_type_${popupType} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onCloseOverlay}>
      <div className={`${classNameContainer}`}>
        <button className="popup__close hover" type="button" aria-label="закрыть всплывающее окно" onClick={onClose}></button>
        <h2 className={`popup__title ${classNameTitle}`}>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default Popup;

