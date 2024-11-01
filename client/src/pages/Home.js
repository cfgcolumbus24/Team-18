import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const handleReportClick = () => {
        navigate("/report");
    }

    const handleAnalyticClick = () => {
        navigate("/analytics");
    }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleReportClick}>Go To Report</button>
      <button onClick={handleAnalyticClick}>Go To Analytics</button>
    </div>
  );
}

export default Home;
