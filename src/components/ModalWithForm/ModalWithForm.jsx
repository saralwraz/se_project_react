import React, { useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <form className="modal__form">
        <button className="modal__close" type="button"></button>
        <p className="modal__heading">New Garment</p>

        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
          />
        </label>

        <label htmlFor="imageLink" className="modal__label">
          Image{" "}
          <input
            type="url"
            id="imageLink"
            className="modal__input"
            placeholder="Image URL"
          />
        </label>

        <fieldset className="modal__radio_buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input type="radio" id="hot" className="modal__radio_input" /> Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" id="warm" className="modal__radio_input" /> Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" id="cold" className="modal__radio_input" /> Cold
          </label>
        </fieldset>
        <button className="modal__submit" type="button">
          Add garment
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
