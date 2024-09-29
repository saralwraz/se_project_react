import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onSubmit,
  closeActiveModal,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <form className="modal__form">
        <button
          onClick={closeActiveModal}
          className="modal__close"
          type="button"
        />
        <h2 className="modal__heading">{title}</h2>
        {children}
        <button className="modal__submit" type="button" onClick={onSubmit}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
