import React from 'react';
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';

function Analytics() {

    const navigate = useNavigate();

    const returnToPreviousPage = () => {
        navigate("/home");
    }

  return (
    <div>
        <Navbar />
        <button className="button ml-4 has-background-info has-text-black" onClick={returnToPreviousPage}>Back</button>
        <h1 className="is-size-1 has-text-centered">Prediction Generator</h1>
        <div class="Container">

        </div>
    </div>
  );
}

export default Analytics;
