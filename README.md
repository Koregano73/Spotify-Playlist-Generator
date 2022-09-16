# Spotify Playlist Generator

## Setup / Installation

1. Install the npm dependencies: ```npm install```

2. Register your app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) to obtain your Client ID and Client Secret

3. Go to "Edit Settings" on your app dashboard to white-list Redirect URI(s) for your app. This represents the link(s) that Spotify OAuth will redirect to after user authentication. 

4. Go to "Users and Access" on your app dashboard to add Spotify users you want to allow access to your app in development mode. Without this step, any user can still *authenticate* via OAuth in your app, but they would be *unauthorized* to make Spotify API calls using your Client ID and Client Secret. 

5. In the root directory of your local app instance, create a ```.env``` file with the following information:

```
CLIENT_ID=<your Client ID>
CLIENT_SECRET=<your Client Secret>
REDIRECT_URI=<your Redirect URI>
PORT=3000 // or another port of your choice for the Express server

// optional: define other REDIRECT_URIs to handle other redirects (e.g. for failed authentication)
```
Since ```.env``` is in ```.gitignore``` and not published to Github, please make sure that you create ```.env``` locally for the app to work.

### Resources


* Our app uses the excellent [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) library to make Spotify API calls. Please see the documentation for other available API methods.

* The Spotify documentations are a great resource for navigating OAuth and discovering all the data available via API calls:

    [Spotify Platform Guides](https://developer.spotify.com/documentation/general/guides/) <br>
    [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api/reference/#/)
