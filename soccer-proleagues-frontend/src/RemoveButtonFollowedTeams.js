import React, { useState } from 'react';
import './stylesheets/RemoveButton.css';

function RemoveButtonFollowedTeams({ listType, unfollowTeam, user_id, id }) {

  const handleSubmitRemove = () => {
      unfollowTeam(user_id, id)
  };

return (
  <button className='removeButtonFollowedTeams' onClick={handleSubmitRemove}></button>
);
}

export default RemoveButtonFollowedTeams;