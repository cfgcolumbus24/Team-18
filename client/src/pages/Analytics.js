import React from 'react';

import { useNavigate } from 'react-router-dom';

function Analytics() {

    const navigate = useNavigate();

    const returnPreviousPage = () => {
      navigate(-1); 
    };

  return (
    <div>
      <h1>Analytics Page</h1>
      <button onClick={returnPreviousPage}>Back</button>
    </div>
  );
}

export default Analytics;
