import React, { useState } from "react";

function PopupWithForm({
  name,
  children,
  ariaLabelBtn = "сохранить изминения",
  nameBtn = "Сохранить",
  textLoading = "Сохранение...",
  onSubmit,
  formValidation,
}) {
  const [loader, setLoader] = useState(nameBtn);

  function handleSubmit(e) {
    onSubmit(e, setLoader, nameBtn);
    setLoader(textLoading);
  }

  return (
    <form className={`popup__form popup__form_type_${name}`} method="get" name={name} noValidate onSubmit={handleSubmit}>
      {children}
      <button
        className={`popup__button ${formValidation ? '' : 'popup__button_type_inactive'}`}
        type="submit"
        aria-label={ariaLabelBtn}
        disabled={!formValidation}>
          {loader}
      </button>
    </form>
  )
}

export default PopupWithForm;
