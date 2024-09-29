import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { APIKey, coordinates } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTempUnitContext } from "../Contexts/CurrentTempUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  // Event handlers
  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItem = (item) => {
    return handleAddItem(item).then((newItem) => {
      setClothingItems([newItem, ...clothingItems]);
      closeActiveModal();
    });
  };

  const handleDeleteCard = (card) => {
    deleteItem(card._id).then(() => {
      setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
      setSelectedCard({});
      closeActiveModal();
    });
  };

  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleToggleSwitchChange = () =>
    setCurrentTempUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));

  // Weather data on mount
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  return (
    <div className="app">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="app__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleToggleSwitchChange={handleToggleSwitchChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
          <ModalWithForm
            buttonText="Add Garment"
            title="New Garment"
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            onSubmit={handleAddItem}
          />

          <ItemModal
            card={selectedCard}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            confirmDeleteModal={handleDeleteCardClick}
          />
        </div>
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
