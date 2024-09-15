import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/wtwr-avatar.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date_time">Date, Location</p>
      <button className="header__add_clothes">+ Add Clothes</button>
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
