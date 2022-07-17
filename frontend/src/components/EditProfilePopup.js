import React, { useContext, useEffect } from "react";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormValidation from "../utils/useFormValidation";

function EditProfilePopup({ isOpen, onClose, onCloseOverlay, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {values, errorMessages, valid, onChange, onBlur, resetForm,} = useFormValidation({});

  function handleSubmit(e, setLoader, nameBtn) {
    e.preventDefault();
    onUpdateUser({name: values['name'], about: values['about']}, setLoader, nameBtn);
  }

  useEffect(() => {
    resetForm({newValues: {name: currentUser.name, about: currentUser.about}, newValid: true})
  }, [currentUser, isOpen]);

  return (
    <Popup popupType="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onCloseOverlay={onCloseOverlay}>
      <PopupWithForm name="profile" onSubmit={handleSubmit} formValidation={valid} >
        <label className="popup__input-group">
          <input
            className={`popup__input popup__input_type_user-name ${errorMessages?.name ? 'input-invalid' : ''}`}
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={values.name || ''}
            onChange={e => onChange(e)}
            onBlur={e => onBlur(e)} />
          <p className="input-error">{errorMessages.name}</p>
        </label>
        <label className="popup__input-group">
          <input
            className={`popup__input popup__input_type_about-me ${errorMessages?.about ? 'input-invalid' : ''}`}
            type="text"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            value={values.about || ''}
            onChange={e => onChange(e)}
            onBlur={e => onBlur(e)} />
          <p className="input-error">{errorMessages.about}</p>
        </label>
      </PopupWithForm>
    </Popup>
  );
}


export default EditProfilePopup;
