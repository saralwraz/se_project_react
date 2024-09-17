import React, { useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, Title }) {
  return (
    <div className="modal">
      <form className="modal__form">
        <button className="modal__close" type="button"></button>
        <h2 className="modal__heading">{Title}</h2>
        {children}
        <button className="modal__submit" type="button">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
