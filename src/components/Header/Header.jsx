import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/wtwr-avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="header logo" />
      <p className="header__date_time">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add_clothes"
      >
        + Add Clothes
      </button>
      <div className="header__user_info">
        <p className="header__username">Terrence Tegegne</p>{" "}
        <img
          src={avatar}
          alt="Terrence Tegegne"
          className="header__user_avatar"
        />
      </div>
    </header>
  );
}

export default Header;
