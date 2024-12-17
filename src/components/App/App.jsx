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
  handleEditProfile as editProfileAPI,
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
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });
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
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  // Fetch weather data on load
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  // Fetch clothing items on load
  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  // Modal Handlers
  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  // Toggle Temperature Unit
  const toggleTempUnit = () =>
    setCurrentTempUnit((prev) => (prev === "F" ? "C" : "F"));

  // Handle Actions
  const handleAddItemSubmit = (newItem) => {
    addItem(newItem, localStorage.getItem("jwt"))
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        closeModal();
      })
      .catch(console.error);
  };

  const handleDeleteCard = () => {
    deleteItem(selectedCard)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id !== selectedCard._id)
        );
        closeModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const cardAction = isLiked ? removeCardLike : addCardLike;

    cardAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    logIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getUserProfile(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        closeModal();
      })
      .catch(console.error);
  };

  const handleRegister = (userData) => {
    register(userData)
      .then(() =>
        handleLogin({ email: userData.email, password: userData.password })
      )
      .catch(console.error);
  };

  const handleEditProfile = (profileData) => {
    const token = localStorage.getItem("jwt");
    editProfileAPI(profileData, token)
      .then((updatedUser) => {
        setCurrentUser((prev) => ({ ...prev, ...updatedUser }));
        closeModal();
      })
      .catch(console.error);
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, toggleTempUnit }}
      >
        <div className="app">
          <Header
            handleAddClick={() => openModal("add-garment")}
            isLoggedIn={isLoggedIn}
            handleLoginModal={() => openModal("login")}
            handleRegisterModal={() => openModal("signup")}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={(card) => {
                    setSelectedCard(card);
                    openModal("preview");
                  }}
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
                    onCardClick={(card) => {
                      setSelectedCard(card);
                      openModal("preview");
                    }}
                    clothingItems={clothingItems}
                    handleAddClick={() => openModal("add-garment")}
                    onCardLike={handleCardLike}
                    handleSignout={handleSignout}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeModal}
            handleAddItemSubmit={handleAddItemSubmit}
          />
          <ItemModal
            card={selectedCard}
            activeModal={activeModal}
            closeActiveModal={closeModal}
            handleDelete={() => openModal("delete-confirmation")}
          />
          <DeleteConfirm
            activeModal={activeModal}
            closeActiveModal={closeModal}
            handleDeleteCard={handleDeleteCard}
          />
          <RegisterModal
            isOpen={activeModal === "signup"}
            closeActiveModal={closeModal}
            handleRegisterModal={handleRegister}
            openLoginModal={() => openModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={closeModal}
            handleLoginModal={() => openModal("signup")}
            onLogIn={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeModal}
            onEditProfileSubmit={handleEditProfile}
          />
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
