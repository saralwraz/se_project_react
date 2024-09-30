import "./DeleteConfirm.css";

function DeleteConfirm({
  activeModal,
  closeActiveModal,
  handleDeleteCard,
  selectedCard,
}) {
  const onCardDelete = () => {
    handleDeleteCard(selectedCard);
  };

  return (
    <div
      className={`modal ${
        activeModal === "delete-confirmation" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_delete">
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        />
        <p className="modal__delete_text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__delete_buttons">
          <button className="modal__confirm_delete" onClick={onCardDelete}>
            Yes, delete item
          </button>
          <button className="modal__cancel" onClick={closeActiveModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
