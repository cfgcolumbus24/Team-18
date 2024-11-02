import React from 'react';
import { useNavigate } from 'react-router-dom';

function Report() {

    const navigate = useNavigate();

    const returnHome = () => {
        navigate("/");
    }

  return (
    <div>
      <h1>Report Page</h1>
      <button onClick={returnHome}>Home</button>
    </div>
  );
}

export default Report;
