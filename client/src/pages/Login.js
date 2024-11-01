import React from 'react';

import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const returnHome = () => {
        navigate("/");
    }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={returnHome}>Home</button>
    </div>
  );
}

export default Login;
