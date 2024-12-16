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
    console.log({ name, imageUrl, weather });
    handleAddItemSubmit({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageLink" className="modal__label">
        Image
        <input
          type="url"
          id="imageLink"
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
    </ModalWithForm>
  );
};

export default AddItemModal;
