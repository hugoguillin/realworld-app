import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import userLogout from "../../services/userLogout";
import Avatar from "../Avatar";
import DropdownItem from "./DropdownItem";

function DropdownMenu() {
  const [dropdown, setDropdown] = useState(false);
  const { loggedUser, setAuthState } = useAuth();
  const { username, image } = loggedUser || {};

  const logout = () => {
    setAuthState(userLogout);
  };

  const handleClick = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <li className="nav-item dropdown">
      <div
        className="nav-link dropdown-toggle cursor-pointer"
        onClick={handleClick}
      >
        <Avatar testid={"user-pic"} alt={username} className="user-pic" src={image} />
        {username}
      </div>

      <div
        className="dropdown-menu"
        style={{ display: dropdown ? "block" : "none" }}
        onMouseLeave={handleClick}
      >
        <DropdownItem
          testid="profile"
          icon="ion-person"
          text="Profile"
          url={`/profile/${username}`}
          state={loggedUser}
        />
        <DropdownItem testid={"settings"} icon="ion-gear-a" text="Settings" url="/settings" />
        <div className="dropdown-divider"></div>
        <DropdownItem testid="logout" icon="ion-log-out" text="Logout" handler={logout} />
      </div>
    </li>
  );
}

export default DropdownMenu;
