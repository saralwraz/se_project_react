import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { APIKey, coordinates } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

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
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };

  // Open confirmation modal
  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirmation");
  };

  // Handle card deletion
  const handleDeleteCard = (card) => {
    deleteItem(card)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
        setSelectedCard({});
        closeActiveModal();
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleToggleSwitchChange = () =>
    setCurrentTempUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));

  const onSignUp = ({ email, password, name, avatar }) => {
    const userProfile = { email, password, name, avatar };
    signUp(userProfile)
      .then((res) => {
        onLogIn({ email, password });
      })
      .catch((error) => {
        console.error("Error at sign up:", error);
      });
  };

  const onLogIn = ({ email, password }) => {
    auth
      .logIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        getUserProfile(data.token).then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate("/profile");
        });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    handleEditProfile({ name, avatar }, token)
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res });
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    return !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
  };

  // Fetch weather data + items on mount
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((error) => console.error("Error fetching weather data:", error));

    getItems()
      .then((items) => setClothingItems(items))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser} isLoggedIn={isLoggedIn}>
      <div className="app">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              isLoggedIn={isLoggedIn}
              handleLoginModal={handleLoginModal}
              weatherData={weatherData}
              clothingItems={clothingItems}
              handleToggleSwitchChange={handleToggleSwitchChange}
              openRegisterModal={handleRegisterModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    isLiked={isLiked}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
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
                    isLiked={isLiked}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                    handleSignout={handleSignout}
                  />
                }
              />
            </Routes>
            <Footer />
            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              handleAddItemSubmit={handleAddItemSubmit}
              buttonText="Add Garment"
              title="New Garment"
            />
            <ItemModal
              card={selectedCard}
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              handleDelete={() => handleDeleteCardClick(selectedCard)}
            />
            <DeleteConfirm
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              handleDeleteCard={handleDeleteCard}
              selectedCard={selectedCard}
            />
            <RegisterModal
              isOpen={activeModal === "signup"}
              closeActiveModal={closeActiveModal}
              onSignUp={onSignUp}
              openLoginModal={handleLoginModal}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              closeActiveModal={closeActiveModal}
              openRegisterModal={handleRegisterModal}
              onLogIn={onLogIn}
            />

            <EditProfileModal
              isOpen={activeModal === "edit"}
              onClose={closeActiveModal}
              onEditProfileSubmit={onEditProfileSubmit}
            />
          </div>
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
