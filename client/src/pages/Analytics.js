import React from 'react';

import { useNavigate } from 'react-router-dom';

function Analytics() {

    const navigate = useNavigate();

    const returnHome = () => {
        navigate("/");
    }

  return (
    <div>
      <h1>Analytics Page</h1>
      <button onClick={returnHome}>Home</button>
    </div>
  );
}

export default Analytics;
