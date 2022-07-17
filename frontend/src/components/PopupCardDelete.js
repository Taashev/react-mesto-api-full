import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";

function PopupCardDelete({ onClose, onCloseOverlay, isOpen, onCardDelete, card }) {
  function handleSubmit(e, setLoader, nameBtn) {
    e.preventDefault();
    onCardDelete(card, setLoader, nameBtn)
  }

  return (
    <Popup
      popupType="card-delete"
      title="Вы уверены?"
      ariaLabelBtn="Подтвердить удаление карточки"
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      isOpen={isOpen} >
        <PopupWithForm
          name="card-delete"
          nameBtn="Да"
          textLoading="Удалине..."
          formValidation="true"
          onSubmit={handleSubmit} />
    </Popup>
  );
}

export default PopupCardDelete;
