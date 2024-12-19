import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// API and Utilities
import { APIKey, coordinates } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  register,
  logIn,
  getUserProfile,
  editUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/auth";

// Contexts
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Modals
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  // State Management
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

  // Initial Data Loading
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
          setCurrentUser(null);
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log("Weather data loaded:", filteredData);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Error loading weather:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        console.log("Initial items loaded:", items);
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error loading items:", error);
      });
  }, []);

  useEffect(() => {
    console.log("clothingItems updated:", clothingItems);
  }, [clothingItems]);

  // Modal Handlers
  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  // Temperature Unit Handler
  const handleToggleSwitchChange = () =>
    setCurrentTempUnit((prev) => (prev === "F" ? "C" : "F"));

  // Item Handlers
  const handleAddItemSubmit = (newItem) => {
    const token = localStorage.getItem("jwt");

    addItem(newItem, token)
      .then((addedItem) => {
        setClothingItems((prevItems) => [addedItem, ...prevItems]);
        closeModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleDeleteCard = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeModal();
      })
      .catch((err) => console.error(err));
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

  // Authentication Handlers
  const handleLogin = ({ email, password }) => {
    logIn({ email, password })
      .then((data) => {
        if (!data.token) throw new Error("Token not received");
        localStorage.setItem("jwt", data.token);
        return getUserProfile(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        closeModal();
      })
      .catch((err) => console.error("Login error:", err));
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
    editUserProfile(profileData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeModal();
      })
      .catch((err) => console.error("Edit profile error:", err));
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
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
                  key={clothingItems.length}
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
                    handleCardLike={handleCardLike}
                    handleSignout={handleSignout}
                    openModal={openModal}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          {/* Modals */}
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeModal}
            handleAddItemSubmit={handleAddItemSubmit}
            currentWeatherType={weatherData.type}
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
            onRegister={handleRegister}
            openLoginModal={() => openModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={closeModal}
            handleRegisterModal={() => openModal("signup")}
            onLogIn={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            closeActiveModal={closeModal}
            onEditProfileSubmit={handleEditProfile}
          />
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
