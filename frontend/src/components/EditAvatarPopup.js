import React, { useEffect } from "react";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

function EditAvatarPopup({ isOpen, onClose, onCloseOverlay, onUpdateAvatar }) {
  const {values, errorMessages, valid, onChange, onBlur, resetForm} = useFormValidation();

  function handleSubmit(e, setLoader, nameBtn) {
    e.preventDefault();
    onUpdateAvatar({ avatar: values.avatar }, setLoader, nameBtn);
  };

  useEffect(() => {
    resetForm({newValues: {}});
  }, [isOpen]);

  return (
    <Popup popupType="update-avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onCloseOverlay={onCloseOverlay}>
      <PopupWithForm name="update-avatar" onSubmit={handleSubmit} formValidation={valid}>
        <label className="popup__input-group">
          <input
            className={`popup__input popup__input_type_avatar ${errorMessages?.avatar ? 'input-invalid' : ''}`}
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
            value={values.avatar || ''}
            onChange={e => onChange(e)}
            onBlur={e => onBlur(e)}
          />
          <p className="input-error">{errorMessages.avatar}</p>
        </label>
      </PopupWithForm>
    </Popup>
  );
}

export default EditAvatarPopup;
