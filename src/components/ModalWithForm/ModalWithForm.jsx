import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  closeActiveModal,
}) {
  return (
    <div
      className={`modal ${
        activeModal === "add-garment" ? "modal__opened" : ""
      }`}
    >
      <form className="modal__form">
        <button
          onClick={closeActiveModal}
          className="modal__close"
          type="button"
        ></button>
        <h2 className="modal__heading">{title}</h2>
        {children}
        <button className="modal__submit" type="button">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
