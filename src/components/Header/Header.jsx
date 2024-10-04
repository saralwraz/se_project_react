import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/wtwr-avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
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
            <p className="header__username">Terrence Tegegne</p>{" "}
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__user_avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
