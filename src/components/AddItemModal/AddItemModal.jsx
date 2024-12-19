import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  closeActiveModal = () => {},
  handleAddItemSubmit = () => {},
  isOpen = false,
}) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => setName(e.target.value);

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => setUrl(e.target.value);

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => setWeather(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      name="add-item"
    >
      <label htmlFor="add-item-name" className="modal__label">
        Name
        <input
          type="text"
          id="add-item-name"
          className="modal__input"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="add-item-image" className="modal__label">
        Image
        <input
          type="url"
          id="add-item-image"
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          required
        />
      </label>
      <fieldset className="modal__radio_buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            name="weatherType"
            className="modal__radio_input"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            name="weatherType"
            className="modal__radio_input"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            name="weatherType"
            className="modal__radio_input"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
      <button type="submit" className="modal__submit">
        Add Garment
      </button>
    </ModalWithForm>
  );
};

export default AddItemModal;
