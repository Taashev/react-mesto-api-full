import React, { useEffect } from "react";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

function AddPlacePopup({ onClose, isOpen, onCloseOverlay, onAddPlace }) {
  const {values, errorMessages, valid, onChange, onBlur, resetForm} = useFormValidation();

  function handleSubmit(e, setLoader, nameBtn) {
    e.preventDefault();
    onAddPlace({ name: values['name'], link: values['link'] }, setLoader, nameBtn);
  };

  useEffect(() => {
    resetForm({newValues: {}});
  }, [isOpen]);

  return (
    <Popup popupType="photo" title="Новое место" onClose={onClose} onCloseOverlay={onCloseOverlay} isOpen={isOpen}>
      <PopupWithForm name="photo" onSubmit={handleSubmit} formValidation={valid} >
        <label className="popup__input-group">
          <input
            className={`popup__input popup__input_type_card-name ${errorMessages?.name ? 'input-invalid' : ''}`}
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            value={values.name || ''}
            onChange={e => onChange(e)}
            onBlur={e => onBlur(e)} />
          <p className="input-error">{errorMessages.name}</p>
        </label>
        <label className="popup__input-group">
          <input
            className={`popup__input popup__input_type_card-link ${errorMessages?.link ? 'input-invalid' : ''}`}
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
            value={values.link || ''}
            onChange={e => onChange(e)}
            onBlur={e => onBlur(e)} />
          <p className="input-error">{errorMessages.link}</p>
        </label>
      </PopupWithForm>
    </Popup>
  );
}

export default AddPlacePopup;
