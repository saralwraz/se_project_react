import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" />
      <p className="header__date_time">Date, Location</p>
      <button className="header__add_clothes">+ Add Clothes</button>
      <div className="header__user_info">
        <p className="header__username">Name</p>{" "}
        <img src="" alt="" className="header__user_avatar" />
      </div>
    </header>
  );
}

export default Header;
