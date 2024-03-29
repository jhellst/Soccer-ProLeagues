import { useContext, useState, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/LeagueList.css";
import LeagueListRow from "./LeagueListRow";
// import TeamsAndLeaguesContext from "./Contexts";


function LeagueList({ user, leagues, title, followedLeagueIds, handleSubmitFollowedLeagues, followLeague, unfollowLeague, isUserList }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [leaguesToFollow, setLeaguesToFollow] = useState({});
  const [leaguesToUnfollow, setLeaguesToUnfollow] = useState({});
  const navigate = useNavigate();

  /** Adds a league to the user's list of new follows. User must submit to finalize new follows. */
  async function addLeagueToFollowList(userId, leagueId) {
    if (userId && userId !== undefined && userId !== null && leagueId && leagueId !== undefined && leagueId !== null) {

      leaguesToFollow[(userId, leagueId)] = true;
      console.log("leaguesToFollow!", leaguesToFollow);

      if ((userId, leagueId) in leaguesToUnfollow) {
        leaguesToUnfollow[(userId, leagueId)] = false;
        setLeaguesToUnfollow(leaguesToUnfollow);
      }

      setLeaguesToFollow(leaguesToFollow);
    }
  }

  /** Adds a team to user's list of leagues to unfollow. User must submit to finalize unfollows. */
  async function addLeagueToUnfollowList(userId, leagueId) {
    if (userId && userId !== undefined && userId !== null && leagueId && leagueId !== undefined && leagueId !== null) {

      leaguesToUnfollow[(userId, leagueId)] = true;
      console.log("leaguesToUnfollow!", leaguesToUnfollow);

      if ((userId, leagueId) in leaguesToFollow) {
        leaguesToFollow[(userId, leagueId)] = false;
        setLeaguesToFollow(leaguesToFollow);
      }

      setLeaguesToUnfollow(leaguesToUnfollow);
    }
  }

  return (

    <>
      <span className="pageButtonsLeague">

        <button onClick={() => {
          navigate(-1);
        }
        }>Back</button>
      </span>



      <div className="LeagueList">

        <h1 className="LeagueList-title">{title}</h1>
        <table className="LeagueListTable">
          <thead>
            <tr>
              <th className="LeagueTable-Column"></th>
              <th scope="col" className="LeagueTable-Column">League</th>
              <th scope="col" className="LeagueTable-Column">Country / Region</th>
              {/* <th scope="col" className="LeagueTable-Column">League Data Last Updated:</th> */}
              {user && <th scope="col" className="LeagueTable-Column-CheckCircle"></th>}
              {/* <th scope="col" class="LeagueTable-Column">Country / Region</th> */}
            </tr>

          </thead>

          <tbody>

            {leagues && leagues.map((league, idx) => (
              <LeagueListRow key={idx} user_id={user?.user_id} leagueId={league.league_id}
                leagueName={league.league_name} leagueUrl={league.league_url}
                lastUpdatedDate={league.last_updated_date} addLeagueToFollowList={addLeagueToFollowList} addLeagueToUnfollowList={addLeagueToUnfollowList} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList={isUserList} isFollowedByUser={((isUserList == "True") || (league && league.league_id && followedLeagueIds && followedLeagueIds.has(league.league_id))) ? (true) : (false)} />
            ))}

          </tbody>


        </table>

      </div>

    </>


  );
}


export default LeagueList;
