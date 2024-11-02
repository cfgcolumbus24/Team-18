import React from 'react';
import 'bulma/css/bulma.min.css';

import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {

    const navigate = useNavigate();

    const returnHome = () => {
        navigate("/home");
    }

  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        <img class="navbar-item is-hoverable" src={require("./netcareLogo.png")} onClick={returnHome}/>
      </div>
      <div class="navbar-end">
      <FaRegUserCircle class="navbar-item"/>
      </div>
    </nav>
    
  );
}

export default Navbar;
