import React from 'react';

import { useNavigate } from 'react-router-dom';

function Analytics() {

    const navigate = useNavigate();

    const returnToPreviousPage = () => {
        navigate("/home");
    }

  return (
    <div>
      <h1>Analytics Page</h1>
      <button onClick={returnToPreviousPage}>Back</button>
    </div>
  );
}

export default Analytics;
