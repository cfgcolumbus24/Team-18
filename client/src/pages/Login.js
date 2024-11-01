import React from 'react';

import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/home");
    }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLoginClick}>Log in</button>
    </div>
  );
}

export default Login;
