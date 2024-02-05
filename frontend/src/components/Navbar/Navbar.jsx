import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavItem from "../NavItem";
import SourceCodeLink from "../SourceCodeLink";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const { isAuth } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <SourceCodeLink left />

        <ul className="nav navbar-nav pull-xs-right">
          <NavItem testid={"home"} text="Home" icon="ion-compose" url="/" />

          {isAuth && (
            <>
              <NavItem testid={"new-article"} text="New Article" icon="ion-compose" url="/editor" />
              <DropdownMenu />
            </>
          )}

          {!isAuth && (
            <>
              <NavItem testid={"login-link"} text="Login" icon="ion-log-in" url="/login" />
              <NavItem testid={"register-link"} text="Sign up" url="/register" />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
