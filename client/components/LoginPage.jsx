import React, { Component } from 'react';
import { useNavigate, Redirect } from 'react-router-dom';

// Login landing page on server start
const LoginPage = () => {
  const getUserData = () => {}
    return (
      <div id="loginPage">
        <h3>Login to Spotify below to continue</h3>
        <a href='http://localhost:3000/api/auth'>
        <button id="login-btn" className="login" onClick={getUserData} >Spotify Login</button>
        </a>
      </div>
    )
  };

  export default LoginPage;