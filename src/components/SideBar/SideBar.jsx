import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleUpdateClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="sidebar">
      <div className="sidebar__userinfo">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="Avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__options">
        <button
          className="sidebar__button"
          type="button"
          id="sidebar__button-update"
          onClick={handleUpdateClick}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button"
          type="button"
          id="sidebar__button_logout"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </section>
  );
}

export default SideBar;
