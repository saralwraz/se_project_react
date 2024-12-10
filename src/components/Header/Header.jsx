import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/wtwr-avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterModal,
  handleLoginModal,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  if (isLoggedIn) {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="header logo" />
        </Link>
        <p className="header__date_time">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__right">
          <ToggleSwitch />
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add_clothes"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user_info">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar || avatar}
                alt={currentUser.name || "User Avatar"}
                className="header__user_avatar"
              />
            </div>
          </Link>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="header logo" />
        </Link>
        <p className="header__date_time">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__right">
          <ToggleSwitch />
          <div className="header__auth-buttons">
            <button
              onClick={handleRegisterModal}
              className="header__signup"
              type="button"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginModal}
              className="header__login"
              type="button"
            >
              Log In
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
