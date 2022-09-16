const express = require('express');
const spotifyApi = require('../utils/apiWrapper');
const querystring = require('node:querystring');
const playlistController = require('../controllers/playlistController');
const userController = require('../controllers/userController')

const router = express.Router();

// redirect to spotify auth form for user sign in/authentication

router.get('/auth', (req, res) => {
  const scope = 'playlist-modify-public';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      redirect_uri: 'http://localhost:8080/api/getToken',
      scope
    }));
});

// obtain access token and refresh token using code from user auth
// use instance of wrapper object "spotifyApi" and its methods to get and store tokens

router.get('/getToken',
  userController.getUserToken,
  (req, res) => {
    res.status(200).redirect('/#/player');
  });

// input: nothing
// output: {spotify_id, display_name, playlist_id }
router.get('/userInfo',
  userController.getSpotifyId,
  userController.checkIfUserExists,
  (req, res) => {
    res.status(200).json(res.locals.doc);
  });

router.post('/createPlaylist',
  playlistController.createPlaylist,
  playlistController.updateDoc,
  playlistController.getRecommendations,
  playlistController.addTracks,
  // new middleware to save newlycreated playlist id (res.locals.playlist_id) & spotify user id (res.locals.spotid)
  (req, res) => {
    res.status(200).json(res.locals.doc)
  });

//This is only for development purposes to see all of our documents
router.get('/users/all',
  userController.getAllUsers,
  (req, res, err) => {
    res.status(200).json(res.locals.data);
  });

// retrieve user doc based on spotify_id
// input: req.body that includes spotify_id
// output: { _id,  spotify_id, playlist_id };
/*{
  "_id": "62fc5afb46d862e41b9db357",
  "spotify_id": "createDoc Id",
  "playlist_id": "1234567",
  "__v": 0
}*/
router.post('/getPlaylist',
  userController.getDoc,
  (req, res, err) => {
    res.status(200).json(res.locals.doc)
  });

//Created a new document at 'spotify_id'
//Input: req.body that includes spotify_id
// output: { _id,  spotify_id, playlist_id };
/*{
  "_id": "62fc5afb46d862e41b9db357",
  "spotify_id": "createDoc Id",
  "playlist_id": "1234567",
  "__v": 0
}*/
router.post('/users/create/',
  userController.createDoc,
  (req, res, err) => {
    res.status(200).send(res.locals.doc);
  });

//Updating a document at 'spotify_id"
// input: req.body that includes spotify_id, and the new playlist_id
// output: { _id,  spotify_id, playlist_id }; THE UPDATED DOC
/*{
  "_id": "62fc5afb46d862e41b9db357",
  "spotify_id": "createDoc Id",
  "playlist_id": "1234567",
  "__v": 0
}*/
router.patch('/users/update/', userController.updateDoc, (req, res, err) => {
  res.status(200).json(res.locals.doc)
});

module.exports = router;