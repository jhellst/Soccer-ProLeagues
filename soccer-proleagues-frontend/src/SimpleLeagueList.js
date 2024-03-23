import { useContext, useState, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/LeagueList.css";
import SimpleLeagueListRow from "./SimpleLeagueListRow";
// import TeamsAndLeaguesContext from "./Contexts";


function SimpleLeagueList({ user, leagues, title }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  console.log("leagues@SimpleLeagueList", leagues, "USER", user);

  return (

    <div className="LeagueList">

      <h1 className="LeagueList-title">{title}</h1>
      <table className="LeagueListTable">
        <thead>
          <tr>
            <th className="LeagueTable-Column"></th>
            <th scope="col" className="LeagueTable-Column">League</th>
            {/* <th scope="col" className="LeagueTable-Column">Country / Region</th> */}
          </tr>

        </thead>

        <tbody>

          {leagues && leagues.map((league, idx) => (
            <SimpleLeagueListRow key={idx} user_id={user?.user_id} leagueId={league.league_id}
              leagueName={league.league_name} leagueUrl={league.league_url}
              lastUpdatedDate={league.last_updated_date} />
          ))}

        </tbody>


      </table>
    </div>

  );
}


export default SimpleLeagueList;
