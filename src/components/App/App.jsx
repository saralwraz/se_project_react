import { useEffect, useState } from "react";
import "./App.css";
import { APIKey, coordinates } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(APIKey, coordinates)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />

        {activeModal === "add-garment" && (
          <ModalWithForm
            buttonText="Add Garment"
            title="New Garment"
            closeActiveModal={closeActiveModal}
          >
            <label htmlFor="name" className="modal__label">
              Name
              <input
                type="text"
                id="name"
                className="modal__input"
                placeholder="Name"
              />
            </label>

            <label htmlFor="imageLink" className="modal__label">
              Image
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
                  value="hot"
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
                  value="warm"
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
                  value="cold"
                  className="modal__radio_input"
                />{" "}
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
        )}

        {activeModal === "preview" && (
          <ItemModal card={selectedCard} closeActiveModal={closeActiveModal} />
        )}
      </div>
    </div>
  );
}

export default App;
