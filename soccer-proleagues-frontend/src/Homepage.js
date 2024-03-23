import { NavLink, Link } from "react-router-dom";
import './stylesheets/Homepage.css';

/** Homepage
 *  Displays welcome message or login/sign up buttons.
 */
function Homepage({ user }) {
  return (
    <div className="Homepage">
      <h1>Soccer ProLeagues</h1>
      <p>Follow all of your Favorite Pro Soccer Leagues and Teams!</p>
      {user ?
        <>
          <h2>Welcome back, {user.username}!</h2>
          <NavLink to={"/users/" + user.user_id + "/leagues"}><button className="UserLink">My Followed Leagues</button></NavLink>
          <NavLink to={"/users/" + user.user_id + "/teams"}><button className="UserLink">My Followed Teams</button></NavLink>
        </>
        :
        <>
          <NavLink to="/signup"><button>Sign Up</button></NavLink>
          <NavLink to="/login"><button>Login</button></NavLink>
        </>
      }
    </div>
  );
}

export default Homepage;
