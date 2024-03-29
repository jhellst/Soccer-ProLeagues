import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./stylesheets/TeamCard.css";
import SimpleLeagueList from "./SimpleLeagueList";
import TeamCardSingle from "./TeamCardSingle";


function SingleTeam({ user = null, getTeamDetail, followedLeagueIds, followedTeamIds }) {
  const [teamId, setTeamId] = useState(useParams().team_id);
  const [teamDetail, setTeamDetail] = useState({});

  useEffect(() => {
    async function setInitialTeamDetail() {
      const teamDetail = await getTeamDetail(teamId);
      setTeamDetail(teamDetail);
    }
    setInitialTeamDetail();
  }, [teamId]);

  return (
    <div>
      <TeamCardSingle userId={user?.user_id} teamId={teamId} teamName={teamDetail.team_name} teamNameAbbrev={teamDetail.team_name_abbrev} teamCrest={teamDetail.team_crest} teamUrl={teamDetail.team_url} />
      <SimpleLeagueList user={user} leagues={teamDetail.leagues_team_is_member_of} followedLeagueIds={followedLeagueIds} title={teamDetail.team_name + "'s Leagues "}/>
    </div>


  );
}


export default SingleTeam;
