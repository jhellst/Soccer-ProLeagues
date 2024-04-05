import React, { useState } from 'react';
import './stylesheets/RemoveButton.css';
import { FaCheckCircle, FaRegCircle, FaTimesCircle } from 'react-icons/fa'; // Import check circle icons


function RemoveButton({ listType, unfollowLeague, unfollowTeam, user_id, id }) {

  const handleSubmitRemove = () => {
    if (listType === "League") {
      unfollowLeague(user_id, id)
    } else {
      unfollowTeam(user_id, id)
    }
  };

return (
  // <button className='removeButton' onClick={handleSubmitRemove}></button>
  <FaTimesCircle className='removeButton' onClick={handleSubmitRemove}/>
);
}

export default RemoveButton;