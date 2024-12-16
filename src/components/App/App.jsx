import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { APIKey, coordinates } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  register,
  logIn,
  getUserProfile,
  handleEditProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile and authentication status on load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    }
  }, []);

  // Fetch weather data on load
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Fetch clothing items on load
  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((error) => console.log(error));
  }, []);

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
    const token = localStorage.getItem("jwt");
    addItem(newItem, token)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleLoginModal = () => setActiveModal("login");
  const handleRegisterModal = () => setActiveModal("signup");

  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirmation");
  };

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

  const onLogIn = ({ email, password }) => {
    logIn({ email, password })
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

  const onRegister = ({ email, password, name, avatarURL }) => {
    const userProfile = { email, password, name, avatarURL };
    register(userProfile)
      .then(() => onLogIn({ email, password }))
      .catch((error) => console.error("Error at sign up:", error));
  };

  const onEditProfileSubmit = ({ name, avatarURL }) => {
    const token = localStorage.getItem("jwt");
    handleEditProfile({ name, avatarURL }, token)
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res });
        closeActiveModal();
      })
      .catch((error) => console.error("Error updating profile:", error));
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              handleRegisterModal={handleRegisterModal}
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
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                      handleSignout={handleSignout}
                    />
                  </ProtectedRoute>
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
              onRegister={onRegister}
              openLoginModal={handleLoginModal}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              closeActiveModal={closeActiveModal}
              handleRegisterModal={handleRegisterModal}
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
