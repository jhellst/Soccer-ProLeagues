import { useState } from "react";
import { Link } from "react-router-dom";
import CheckCircleToggleLeagues from "./CheckCircleLeagues";
// import "./stylesheets/LeagueTableRow.css";


function SimpleLeagueListRow({ user_id, leagueId, leagueName, leagueUrl, lastUpdatedDate }) {
  // const [isLoaded, setIsLoaded] = useState(false);

  console.log("leagueId", leagueId);

  return (

    <tr className="LeagueListRow">
      <td>{leagueId}</td>
      <Link to={`/leagues/${leagueId}`}>
        <td>{leagueName}</td>
      </Link>
      {/* <td>{leagueUrl}</td> */}
      {/* <td>{lastUpdatedDate}</td> */}

    </tr>

  );
}


export default SimpleLeagueListRow;
