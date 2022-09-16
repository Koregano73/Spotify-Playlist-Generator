//server/controllers/userController.js
const User = require('../models/userModel.js');
const spotifyApi = require('../utils/apiWrapper');

const userController = {}

//This calls the Spotify API
userController.getUserToken = (req, res, next) => {
    const { code } = req.query;

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      res.cookie('access', access_token).cookie('refresh', refresh_token);
      return next();
    })
    .catch(err => {
      res.status(err.statusCode).json(`Error: Status Code ${err.statusCode}`)});
}

//This calls the Spotify API
//call the Spotify API to get the currently logged in user's "spotify_id"
userController.getSpotifyId = (req, res, next) => {
    spotifyApi.getMe()
      .then((data) => {
        res.locals.spotify_id = data.body.id;
        res.locals.display_name = data.body.display_name;
        return next();
      })
      .catch(err => {console.log('userController.getSpotifyId err: ', err)})
}

//Queries DB
//this queries the DB to see if a user with a particular spotify_id exists
userController.checkIfUserExists = (req, res, next) => {
    const spotify_id = res.locals.spotify_id
    const display_name = res.locals.display_name
    User.findOneAndUpdate({spotify_id}, {spotify_id, display_name}, {upsert:true, new:true})
    .then((doc)=>{
        res.locals.doc = doc;
        return next();
    })
    .catch(err => {console.log('userController.checkifuserexist err: ', err)})
}

userController.checkIfUserExists2 = async (req, res, next) => {
    const spotify_id = res.locals.spotify_id
    const display_name = res.locals.display_name
    try {
        const links = await User
        .findOneAndUpdate({spotify_id}, {spotify_id, display_name}, {upsert:true, new:true})
        .then((doc)=>{
            res.locals.doc = doc;
            return next();
        })

    } catch(err) {
        res.status(418).send({message: "Error"});
    }

}

//Queries DB
// getAllUsers (find)
userController.getAllUsers = (req, res, next) => {
    User.find({})
    .exec()
    .then((data)=>{
        res.locals.data = data;
        return next();
    })
}

//Queries DB
userController.getDoc = (req, res, next) => {
    const { spotify_id } = req.body
    User.findOne({spotify_id}, (err, doc) => {
        if(err){
            return next('Error in userController.getDoc: ' + JSON.stringify(err))
        }
        res.locals.doc = doc;
        next()
    })
}

//Queries DB*********
//createDoc (create)
userController.createDoc = (req, res, next) => {
    const spotify_id = "spotify_id"
    const playlist_id = "playlistId goes here";
    User.create({spotify_id, playlist_id}, (err, doc) => {
        if(err){
            return next('Error in userController.createDoc: ' + JSON.stringify(err))
        }
        next()
    })
}

//Queries DB
userController.updateDoc = (req, res, next) => {
    const {spotify_id, playlist_id} = req.body
    User.findOneAndUpdate({spotify_id}, {playlist_id}, {new: true}, (err, doc) => {
        if(err){
            return next('Error in userController.updateDoc: ' + JSON.stringify(err))
        }
        res.locals.doc = doc;
        next()
    })
}

module.exports = userController;