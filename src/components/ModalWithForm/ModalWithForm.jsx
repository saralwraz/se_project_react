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
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <form className="modal__form" onSubmit={handleSubmit}>
        <button
          onClick={closeActiveModal}
          className="modal__close"
          type="button"
        />
        <h2 className="modal__heading">{title}</h2>
        {children}
        <button className="modal__submit" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
