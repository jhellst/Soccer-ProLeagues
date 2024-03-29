import React, { useState } from 'react';
import './stylesheets/RemoveButton.css';

function RemoveButton({ listType, unfollowLeague, unfollowTeam, user_id, id }) {

  const handleSubmitRemove = () => {
    if (listType === "League") {
      unfollowLeague(user_id, id)
    } else {
      unfollowTeam(user_id, id)
    }
  };

return (
  <button className='removeButton' onClick={handleSubmitRemove}></button>
);
}

export default RemoveButton;