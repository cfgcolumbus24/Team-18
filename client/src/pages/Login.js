import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = (e) => {
    e.preventDefault();

    // Validation for demo
    if (email === 'user@example.com' && password === 'password123') {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="has-background-white" style={{ height: '100vh' }}>
      <div className="columns is-centered is-vcentered" style={{ height: '100%' }}>
        <div className="column is-half">
          <div className="box" style={{ backgroundColor: '#003366', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h1 className="title has-text-centered has-text-white">Netcare Access</h1>
            {error && <p className="has-text-danger">{error}</p>}
            <form onSubmit={handleLoginClick}>
              <div className="field">
                <label className="label" style={{ color: 'white' }}>Email:</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ backgroundColor: 'white', color: 'black' }} // White background for input
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ color: 'white' }}>Password:</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ backgroundColor: 'white', color: 'black' }} // White background for input
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-info is-fullwidth" type="submit">Log in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
