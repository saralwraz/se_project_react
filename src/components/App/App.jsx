import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { APIKey, coordinates } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTempUnitContext } from "../Contexts/CurrentTempUnitContext";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";

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

  const handleAddItemSubmit = (newItem) => {
    setClothingItems([newItem, ...clothingItems]);
    closeActiveModal();
  };

  // Open confirmation modal
  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirmation");
  };

  // Handle card deletion
  const handleDeleteCard = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
        setSelectedCard({});
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleToggleSwitchChange = () =>
    setCurrentTempUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));

  // Fetch weather data on mount
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
            clothingItems={clothingItems}
            handleToggleSwitchChange={handleToggleSwitchChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            handleAddItemSubmit={handleAddItemSubmit}
          />
          <ItemModal
            card={selectedCard}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleDelete={() => handleDeleteCardClick(selectedCard)} // Open delete modal when delete is clicked
          />
          <DeleteConfirm
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleDeleteCard={handleDeleteCard}
            selectedCard={selectedCard}
          />
        </div>
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
