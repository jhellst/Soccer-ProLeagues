import { useState } from "react";
import { Link } from "react-router-dom";
import CheckCircleToggleLeagues from "./CheckCircleLeagues";
// import "./stylesheets/LeagueTableRow.css";
import "./stylesheets/SimpleLeagueListRow.css"


function SimpleLeagueListRow({ user_id, leagueId, leagueName, leagueUrl, lastUpdatedDate }) {
  // const [isLoaded, setIsLoaded] = useState(false);

  console.log("leagueId", leagueId);

  return (

    <tr className="SimpleLeagueListRow">
      <td>{leagueId}</td>
      <Link to={`/leagues/${leagueId}`}>
        <td>{leagueName}</td>
      </Link>
      <td>{leagueUrl}</td>
      {/* <td>{lastUpdatedDate}</td> */}

    </tr>

  // <tr className="LeagueListRow">
  // <td>{leagueId}</td>
  // <Link to={`/leagues/${leagueId}`}>
  //   <td className="leagueName">{leagueName}</td>
  // </Link>
  // <td>{leagueUrl}</td>
  // {/* <td>{lastUpdatedDate}</td> */}
  // {(isFollowedByUser === true && isUserList === "True") ?
  //   <RemoveButtonLeague listType="League" unfollowLeague={unfollowLeague} user_id={user_id} id={leagueId} /> :

  //   user_id &&
  //   <td className="LeagueTable-Column-CheckCircle">
  //     <CheckCircleToggleLeagues user_id={user_id} league_id={leagueId} submitFollowedLeagues={submitFollowedLeagues} isFollowedByUser={isFollowedByUser} addLeagueToFollowList={addLeagueToFollowList} addLeagueToUnfollowList={addLeagueToUnfollowList} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList={isUserList} />
  //   </td>

  // }

  // </tr>

  );
}


export default SimpleLeagueListRow;
