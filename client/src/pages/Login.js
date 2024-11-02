import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Uncomment this line if you add CSS for styling

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = (e) => {
    e.preventDefault();

    //Validation for demo
    if (email === 'user@example.com' && password === 'password123') {
      navigate('/home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLoginClick}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
