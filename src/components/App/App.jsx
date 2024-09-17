import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
        <ModalWithForm buttonText="Add Garment" Title="New Garment">
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
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" id="hot" className="modal__radio_input" /> Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" id="warm" className="modal__radio_input" />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" id="cold" className="modal__radio_input" />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
      </div>
    </div>
  );
}

export default App;
