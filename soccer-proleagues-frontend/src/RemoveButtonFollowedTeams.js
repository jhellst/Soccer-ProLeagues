import React, { useState } from 'react';
// import './stylesheets/RemoveButton.css';
import './stylesheets/RemoveButtonFollowedTeams.css';
import xMarkCircle from './images/circle-xmark-solid.svg';


function RemoveButtonFollowedTeams({ listType, unfollowTeam, user_id, id }) {

  const handleSubmitRemove = () => {
      unfollowTeam(user_id, id)
  };

return (
  // <xMarkCircle visibility={visibility} onClick={unfollowTeam} className='xMarkCircle' />
  <button className='removeButtonFollowedTeams' onClick={handleSubmitRemove}></button>
);
}

export default RemoveButtonFollowedTeams;