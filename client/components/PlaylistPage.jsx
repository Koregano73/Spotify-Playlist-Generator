import React from 'react';
import PlaylistForm from './PlaylistForm.jsx';

// Description: Playlist form page to have user input desired length, time, and genre.
const PlaylistPage = (props) => {
  return (
  <div id='formPage'>
    <h1>Fill out the form below to generate a new playlist</h1>
    <PlaylistForm spotify_id={props.spotify_id} updatePlaylistId={props.updatePlaylistId}/>
  </div>
  )
};

export default PlaylistPage;
