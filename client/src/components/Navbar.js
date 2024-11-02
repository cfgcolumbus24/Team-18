import React from 'react';

import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {

    const navigate = useNavigate();

    const returnHome = () => {
        navigate("/");
    }

  return (
    <nav>
      <img src={require("./netcareLogo.png")} onClick={returnHome}/>
      <FaRegUserCircle />
    </nav>
  );
}

export default Navbar;
