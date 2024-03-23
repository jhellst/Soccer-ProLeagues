import { useState } from "react";
import { Link } from "react-router-dom";
import CheckCircleToggleLeagues from "./CheckCircleLeagues";
import "./stylesheets/LeagueListRow.css";


function LeagueListRow({ user_id, leagueId, leagueName, leagueUrl, lastUpdatedDate, submitFollowedLeagues, addLeagueToFollowList, addLeagueToUnfollowList, isFollowedByUser }) {
  // const [isLoaded, setIsLoaded] = useState(false);

  return (

    <tr className="LeagueListRow">
      <td>{leagueId}</td>
      <Link to={`/leagues/${leagueId}`}>
        <td>{leagueName}</td>
      </Link>
      <td>{leagueUrl}</td>
      {/* <td>{lastUpdatedDate}</td> */}
      {user_id &&
        <td className="LeagueTable-Column-CheckCircle">
          <CheckCircleToggleLeagues user_id={user_id} league_id={leagueId} submitFollowedLeagues={submitFollowedLeagues} isFollowedByUser={isFollowedByUser} addLeagueToFollowList={addLeagueToFollowList} addLeagueToUnfollowList={addLeagueToUnfollowList} />
        </td>
      }

    </tr>

  );
}


export default LeagueListRow;
