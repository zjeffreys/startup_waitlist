import React from 'react';
import { useLocation } from 'react-router-dom';

const EditWaitlist = (waitlist_name) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const waitlistId = params.get('waitlistId');

  return (
    <div >
        <a href='/my-waitlists'>Back</a>
        <h1>{waitlistId}</h1>
      
    </div>
  );
};

export default EditWaitlist;
