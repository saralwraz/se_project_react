import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  isOpen,
  onSubmit,
  closeActiveModal,
}) {
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeActiveModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleModalClick}
    >
      <form className="modal__form" onSubmit={handleSubmit} noValidate>
        <button
          onClick={closeActiveModal}
          className="modal__close"
          type="button"
        />
        <h2 className="modal__heading">{title}</h2>
        {children}
      </form>
    </div>
  );
}

export default ModalWithForm;
