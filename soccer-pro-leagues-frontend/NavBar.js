// import "./Nav.css";
import { NavLink } from "react-router-dom";
import "./stylesheets/NavBar.css"


/** Renders navigation bar for website.
 */
function NavBar( ) {

  return (
    <nav className="NavBar">
        <NavLink to="/">ProLeagues Homepage</NavLink>
        <NavLink to="/customize">Customize Leagues</NavLink>
    </nav>

  );
}


export default NavBar;
