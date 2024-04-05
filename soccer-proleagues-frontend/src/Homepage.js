import { NavLink, Link } from "react-router-dom";
import './stylesheets/Homepage.css';
import logo from './images/logo.svg';

/** Homepage
 *  Displays welcome message or login/sign up buttons.
 */
function Homepage({ user }) {

  return (
    <div className="Homepage">


      <div class="homepageSummary">
        <div class="style-3"><img src={logo} alt="Soccer ProLeagues Title/Logo" width="260" height="260" class="style-4" /></div>
        <p class="style-5">Soccer ProLeagues uses web-scraped data to populate team and league statistics from various pro soccer leagues. Users can log in and select teams and leagues to follow, allowing the user to create their own customized pages including their favorite leagues!</p><a href="https://github.com/jhellst/Soccer-ProLeagues" class="style-8"><button class="style-9">See Project Details</button></a>
      </div>

      {user ?
        <>
          <h2>Welcome back, {user.username}!</h2>
          <div className="homepageButtonContainer">
            <NavLink to={"/users/" + user.user_id + "/leagues"}><button className="UserLink">My Followed Leagues</button></NavLink>
            <NavLink to={"/users/" + user.user_id + "/teams"}><button className="UserLink">My Followed Teams</button></NavLink>
          </div>
        </>
        :
        <>
          <div className="homepageButtonContainer">
            <NavLink to="/signup"><button>Sign Up</button></NavLink>
            <NavLink to="/login"><button>Login</button></NavLink>
          </div>
        </>
      }
    </div>
  );
}

export default Homepage;
