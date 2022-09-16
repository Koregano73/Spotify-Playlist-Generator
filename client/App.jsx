import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./components/LoginPage.jsx";
import PlaylistPage from "./components/PlaylistPage.jsx";
import EmbeddedPlayer from "./components/EmbeddedPlayer.jsx";
import Navbar from "./components/Navbar.jsx";
import DancingStuff from './components/DancingStuff.jsx'
import DancingLeft from './components/DancingLeft.jsx';
import DancingRight from './components/DancingRight.jsx';

import "./stylesheets/styles.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      playlistId: "Initial value",
      username: undefined,
      spotify_id: undefined,
      isLoggedIn: false,
    };
    // bind handler this component
    this.updatePlaylistId = this.updatePlaylistId.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.updateIsLoggedIn = this.updateIsLoggedIn.bind(this);
  }

  // define handler for playlistFormSubmit that will get passed down to PlaylistForm component
  // this needs to be passed down to PlaylistPage then to PlaylistForm
  updatePlaylistId(id) {
    // should update state to set playlistId to the one returned from the form
    this.setState({ playlistId: id });
  }

  updateUserInfo(user) {
    this.setState({
      playlistId: user.playlist_id,
      username: user.display_name,
      spotify_id: user.spotify_id,
    });
  }

  updateIsLoggedIn(input) {
    this.setState({
      isLoggedIn: input,
    });
  }

  render() {
    return (
      <Router>
        <div id="app">
          {this.state.isLoggedIn ? <Navbar
            isLoggedIn={this.state.isLoggedIn}
            updateIsLoggedIn={this.updateIsLoggedIn}
            updateUserInfo={this.updateUserInfo}
          /> : <div id="navBar"></div>}
          {this.state.isLoggedIn ? 
          <div id='title'>
          <div id='name' className="chill-pulse">Axolotl Beats</div>
          <div id='slogan' className="chill-pulse">beats forEach</div>
          </div> : 
          <div id='title'>
                <div id='name' className="pulse">Axolotl Beats</div>
                <div id='slogan' className="pulse">beats forEach</div>
          </div>}
          
          {this.state.isLoggedIn ? <></>: <DancingStuff />}
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route
              path="/player"
              element={
                <div className="player-div">
                  <DancingLeft />
                  <EmbeddedPlayer
                    isLoggedIn={this.state.isLoggedIn}
                    updateIsLoggedIn={this.updateIsLoggedIn}
                    updateUserInfo={this.updateUserInfo}
                    playlistId={this.state.playlistId}
                    username={this.state.username}
                    spotify_id={this.state.spotify_id}
                  />
                  <DancingRight />
                </div>
                
              }
            ></Route>
            <Route
              path="/playlistform"
              element={
                <PlaylistPage
                  spotify_id={this.state.spotify_id}
                  updatePlaylistId={this.updatePlaylistId}
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;