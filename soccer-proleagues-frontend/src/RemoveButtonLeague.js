import React, { useState } from 'react';
import './stylesheets/RemoveButtonLeague.css';

function RemoveButtonLeague({ unfollowLeague, user_id, id }) {

  const handleSubmitRemove = () => {
    unfollowLeague(user_id, id);
  };

  return (
    <button className='removeButtonLeague' onClick={handleSubmitRemove}></button>
  );
}

export default RemoveButtonLeague;