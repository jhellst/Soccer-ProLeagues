import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaTimesCircle } from 'react-icons/fa'; // Import check circle icons
import './stylesheets/RemoveButtonLeague.css';

function RemoveButtonLeague({ unfollowLeague, user_id, id }) {

  const handleSubmitRemove = () => {
    unfollowLeague(user_id, id);
  };

  return (
    // <button className='removeButtonLeague' onClick={handleSubmitRemove}></button>
    <FaTimesCircle className='removeButtonLeague' onClick={handleSubmitRemove}/>
  );
}

export default RemoveButtonLeague;