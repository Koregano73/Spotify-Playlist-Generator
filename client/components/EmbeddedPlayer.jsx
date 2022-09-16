import React, {useEffect, useState} from 'react';

const EmbeddedPlayer = props => {
  const uri = `https://open.spotify.com/embed/playlist/${props.playlistId}?utm_source=generator`

 

  useEffect(()=>{
    //do a PATCH and add props.playlistId
    if(document.cookie){
      fetch('/api/userInfo')
      .then((data) => data.json())
      .then((user) => {
        console.log('user info:', user);
        // update state to put in spotify_id, playlist_id(from db history), username
        props.updateUserInfo(user);
        props.updateIsLoggedIn(true)
      })
      .catch((error) => { 
        console.log('Fetch error is:', error)
      })
    }
    else{
      console.log('You are not logged in!');
    }
  }, [])

  //once a user logs in, we need to receive a spotify_id back from the Spotify API

  //using the spotify_id, we need to peform a POST req to our DB to return out their document
    //if a document with that spoitfy_id is not found 
      //we need to create a new document with that spotify_id, and the playlist_id can be null for now
    //else if a document is found
      //return that document to the front end
    

  if (!props.playlistId){
    return(
      <div>
        <br></br>
        <p>No playlist here!</p>
      </div>
    );
  } 
  return(
    <div className="embedded-player">
      <h1>Welcome <span>{props.username}!</span></h1>
      <iframe
      id='iframe-player'
        src={uri}
        width="100%"
        height="380"
      >
      </iframe>
      
    </div>
  )
}

export default EmbeddedPlayer;
//<iframe style="border-radius:12px"  width="100%" height="380" frameBorder="0" allowfullscreen=""  fullscreen; picture-in-picture">
//</iframe>