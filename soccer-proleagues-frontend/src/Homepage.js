import { NavLink, Link } from "react-router-dom";
import './stylesheets/Homepage.css';

/** Homepage
 *  Displays welcome message or login/sign up buttons.
 */
function Homepage({ user }) {

  return (
    <div className="Homepage">


      <div class="homepageSummary">
        <div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/008/479/756/small/illustration-logo-soccer-ball-with-laurel-wreath-and-crown-vector.jpg"></img>
        {/* <img src="/soccer-proleagues/soccer-proleagues-frontend/src/images/bs4logo.jpg" alt="Image 2"></img> */}

        </div>
        {/* <div className="style-1"><img alt="Soccer ProLeagues Title/Logo" width="140" height="140" src="/Users/joshhellstrom/Desktop/soccer-proleagues/soccer-proleagues-frontend/src/images/logo.svg" className="style-2" /> */}
          <div class="style-3"><img alt="Soccer ProLeagues Title/Logo" width="260" height="260" class="style-4" />

            <p class="style-5">Soccer ProLeagues uses web-scraped data to populate team and league statistics from various pro soccer leagues. Users can log in and select teams and leagues to follow, allowing the user to create their own customized pages including their favorite leagues!</p><a href="https://github.com/jhellst/Soccer-ProLeagues" class="style-8"><button class="style-9">See Project Details</button></a>
          </div>
      </div>

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
