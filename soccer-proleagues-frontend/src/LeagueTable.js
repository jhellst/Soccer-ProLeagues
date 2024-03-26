import { useState, useEffect } from "react";
import LeagueTableRow from "./LeagueTableRow";
import TeamsAndLeaguesContext from "./Contexts";
import LeagueList from "./LeagueList";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./stylesheets/LeagueTable.css";
// import LeagueTableRow from "./LeagueTableRow";


function LeagueTable({ getLeagueTable }) {
  const [leagueId, setLeagueId] = useState(useParams().league_id);
  const [leagueTable, setLeagueTable] = useState([]);
  const [leagueName, setLeagueName] = useState(null);
  const teamsAndLeaguesContext = useContext(TeamsAndLeaguesContext);

  const leagueInfo = getLeagueTable(leagueId);
  const teams = teamsAndLeaguesContext.teams;
  const leagues = teamsAndLeaguesContext.leagues;

  const curLeague = leagues.filter(league => league.league_id == leagueId);


  useEffect(() => {
    async function setCurrentLeagueTable() {
      const league = await getLeagueTable(leagueId);
      setLeagueTable(league);
    }
    setCurrentLeagueTable();
  }, leagueId);


  if (leagueId) {

    return (

      <div className="LeagueTable">
        <h1 className="LeagueTable-title">{curLeague[0]?.league_name}</h1>

      <table className="LeagueTable">
        <thead>
          <tr>
            <th scope="col" className="LeagueTable-Column"></th>
            <th scope="col" className="LeagueTable-Column">Team</th>
            <th scope="col" className="LeagueTable-Column">MP</th>
            <th scope="col" className="LeagueTable-Column">W</th>
            <th scope="col" className="LeagueTable-Column">D</th>
            <th scope="col" className="LeagueTable-Column">L</th>
            <th scope="col" className="LeagueTable-Column">GF</th>
            <th scope="col" className="LeagueTable-Column">GA</th>
            <th scope="col" className="LeagueTable-Column">GD</th>
            <th scope="col" className="LeagueTable-Column">Pts</th>
            {/* <th scope="col" className="LeagueTable-Column">Last 5</th> */}
          </tr>
        </thead>

        {leagueTable.map((team, idx) => (
            <LeagueTableRow key={idx} teamId={team.team_id} teamName={team.team_name} teamNameAbbrev={team.team_name_abbrev}
              teamCrest={team.team_crest} teamHyperlink={team.team_hyperlink} currentStanding={team.current_standing} wins={team.wins}
              draws={team.draws} losses={team.losses} gamesPlayed={team.games_played}
              goalsFor={team.goals_for} goalsAgainst={team.goals_against}
              goalDifferential={team.goal_differential} points={team.points} />
          ))}

      </table>
      </div>


    );
  } else {

    return (

      <div className="LeagueTable">
        {/* <LeagueList leagues={leagues} /> */}
      </div>

    );
  }
}

export default LeagueTable;
