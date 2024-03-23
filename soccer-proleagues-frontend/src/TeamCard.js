import { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/TeamCard.css";
import CheckCircle from "./CheckCircle";

function TeamCard({ teamId, teamName, teamNameAbbrev, teamCrest, teamUrl, submitFollowedTeams, addTeamToFollowList, addTeamToUnfollowList, isFollowedByUser, user_id=null }) {

  return (

    <div className="TeamCard">
        <div className="TeamCardCheckbox">
          <CheckCircle user_id={user_id} team_id={teamId} submitFollowedTeams={submitFollowedTeams} isFollowedByUser={isFollowedByUser} addTeamToFollowList={addTeamToFollowList} addTeamToUnfollowList={addTeamToUnfollowList}/>
        </div>

      <div className="TeamCardInfo">

      <Link className="TeamCard-Link" to={"/teams/" + teamId}>
        <div className="TeamName">{teamName}</div>
        <div className="TeamCrest">
          <img src={teamCrest} alt={teamName + " Team Crest"} />
        </div>
      </Link>

      <Link className="TeamCardNews" to={teamUrl}>
        <div className="TeamCardNewsDiv">{teamName} Team News</div>
      </Link>
      </div>

    </div>


  );
}


export default TeamCard;
