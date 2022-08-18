import React, { Component } from 'react';
import { useNavigate, Redirect } from 'react-router-dom';

const LoginPage = () => {

  // const navigate = useNavigate();

  const getUserData = () => {
    // console.log('button is clicked!');
    // possible stretch feature method: create new window for oauth and redirect on success
    }

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