import React, { useState } from 'react';

import { axiosWithAuth } from '../authorization/AxiosWithAuth';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    event.preventDefault();
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then((response) => {
        localStorage.setItem('token', response.data.payload);
        props.history.push('bubbles');
      });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1>Welcome to the Bubble App!</h1>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <br />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
