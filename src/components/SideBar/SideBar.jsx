import "./SideBar.css";
import avatar from "../../assets/wtwr-avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__user">Terrence Tegegne</p>
    </div>
  );
}
export default SideBar;
