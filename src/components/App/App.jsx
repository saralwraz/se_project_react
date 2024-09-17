import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [activeModal, setActiveModal] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} />
        <Footer />

        {activeModal === "add-garment" && (
          <ModalWithForm
            buttonText="Add Garment"
            title="New Garment"
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
          >
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
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  id="hot"
                  name="weatherType"
                  className="modal__radio_input"
                />{" "}
                Hot
              </label>
              <label
                htmlFor="warm"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  id="warm"
                  name="weatherType"
                  className="modal__radio_input"
                />{" "}
                Warm
              </label>
              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  id="cold"
                  name="weatherType"
                  className="modal__radio_input"
                />{" "}
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
        )}
      </div>
    </div>
  );
}

export default App;
