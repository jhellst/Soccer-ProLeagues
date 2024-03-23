import TeamCard from "./TeamCard";
import { useState, useEffect } from "react";
import { useHistory } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./stylesheets/TeamCardList.css";


function TeamCardList({ user, teams, title, followedTeamIds, handleSubmitFollowedTeams }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [teamsToFollow, setTeamsToFollow] = useState({});
  const [teamsToUnfollow, setTeamsToUnfollow] = useState({});

  const navigate = useNavigate();

  /** Adds a team to the user's list of new follows. User must submit to finalize new follows. */
  async function addTeamToFollowList(userId, teamId) {
    if (userId && userId !== undefined && userId !== null && teamId && teamId !== undefined && teamId !== null) {

      teamsToFollow[(userId, teamId)] = true;

      if ((userId, teamId) in teamsToUnfollow) {
        teamsToUnfollow[(userId, teamId)] = false;
        setTeamsToUnfollow(teamsToUnfollow);
      }

      setTeamsToFollow(teamsToFollow);
    }
  }

  /** Adds a team to user's list of teams to unfollow. User must submit to finalize unfollows. */
  async function addTeamToUnfollowList(userId, teamId) {
    if (userId && userId !== undefined && userId !== null && teamId && teamId !== undefined && teamId !== null) {

      teamsToUnfollow[(userId, teamId)] = true;

      if ((userId, teamId) in teamsToFollow) {
        teamsToFollow[(userId, teamId)] = false;
        setTeamsToFollow(teamsToFollow);
      }

      setTeamsToUnfollow(teamsToUnfollow);
    }
  }

  // console.log("followedTeams@TeamCardList", teams, "user", user, "USER_ID", user?.user_id);
  // console.log("FOL_TEAMS", teams);
  // console.log("FOL_TEAM_IDS", followedTeamIds);

  return (
    <div className="TeamCardList">
      {/* {!isLoaded && <p>League Table Loading...</p>} */}
      <h1>{title}</h1>

      <button onClick={() => {
        handleSubmitFollowedTeams(teamsToFollow, teamsToUnfollow);
        navigate("/");
      }
      }>Submit Follows/Unfollows</button>

      <button onClick={() => {
        navigate(-1);
      }
      }>Back</button>

      <div className="TeamCardListInfo">

        {teams.map((team, idx) => (
          <TeamCard key={idx} teamId={team.team_id} teamName={team.team_name} teamNameAbbrev={team.team_name_abbrev}
            teamCrest={team.team_crest} teamUrl={team.team_url} user_id={user?.user_id} addTeamToFollowList={addTeamToFollowList} addTeamToUnfollowList={addTeamToUnfollowList} isFollowedByUser={(team && team.team_id && followedTeamIds && followedTeamIds.has(team.team_id)) ? (true) : (false)} />

        ))}

      </div>

    </div>
  );
}


export default TeamCardList;
