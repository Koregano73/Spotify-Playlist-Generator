import React, { useState } from "react";
import { Link } from "react-router-dom";
import axolotl from '../imgs/axolotl.gif';
import duck from '../imgs/quack-quack-dance.gif';

// Description: Component to get Spotify API playlist on user input completion and display on site.
const PlaylistForm = (props) => {
  const [showButton, setShowButton] = useState(false);
  const [spotify_id, setSpotify_id] = useState(props.spotify_id);
  const [danceImg, setDanceImg] = useState()
  // declare const for each of our drop downs

  // onsubmit click handler for create playlist form and send to backend
  const handlePlaylistSubmit = async (event) => {
    // prevent immediately reloading of page when form is submitted
    event.preventDefault();
    setDanceImg(<div id="loading-img"><img src={axolotl}></img><img src={duck}></img></div>)
  
    // add input from form to constants genre, tempo, and duration
    const playlistName = event.target[0].value;
    const playlistDescription = event.target[1].value;
    const genre = event.target[2].value;
    const tempo = event.target[3].value;
    // change this in the form and cast as a number
    const duration = parseInt(event.target[4].value);

    // package form-data into an object
    const requestData = {
      playlistName,
      playlistDescription,
      genre,
      tempo,
      duration,
      spotify_id,
    };
    // get request to backend, with body as requestData
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    fetch("/api/createPlaylist", requestOptions)
      .then((data) => data.json())
      .then((doc) => {
        setDanceImg(' ')
        setShowButton(true);
      })
      // handle errors
      .catch((error) => {
        console.log("Fetch error is:", error);
      });

    
  };

  return (
    <div>
      <div className="formContainer">
        <form name="playlist-form" className="playlist-form" onSubmit={handlePlaylistSubmit}>
          <div className="div_input-container">
            What is the name of your new playlist?
            <label className="input-label">
              <input className="inputBox"></input>
            </label>
          </div>

          <div className="div_input-container">
            What is the description of your new playlist?
            <label className="input-label">
              <input className="inputBox"></input>
            </label>
          </div>

          <div className="dropdown-container">
            <label className="dropdown-label">
              What genre are you in the mood for?
              <br />
              <select
                className="dropdown-menu"
                defaultValue="Select Your Genre"
              >
                <option disabled>Select Your Genre</option>
                <option value="electronic">Electronic</option>
                <option value="k-pop">K-Pop</option>
                <option value="work-out">Workout</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
              </select>
            </label>
          </div>

          <div className="dropdown-container">
            <label className="dropdown-label">
              What tempo would you like your playlist to follow?
              <br />
              <select
                className="dropdown-menu"
                defaultValue="Select Your Tempo"
              >
                <option disabled>Select Your Tempo</option>
                <option value="fast">Fast</option>
                <option value="slow">Slow</option>
              </select>
            </label>
          </div>

          <div className="dropdown-container">
            <label className="dropdown-label">
              How long would you like your playlist to last?
              <br />
              <select
                className="dropdown-menu"
                defaultValue="Select Your Duration"
              >
                <option disabled>Select Your Duration</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
            </label>
          </div>

          <input
            className="makePlaylist"
            type="submit"
            value="Give me my playlist!"
          />
        </form>
        {danceImg}
        {showButton && (
          <Link to="/player">
            <button className="makePlaylist">Take me to my new playlist</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PlaylistForm;