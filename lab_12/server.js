// -- Libraries --
var express = require("express");
var spotifyWebApi = require("spotify-web-api-node");

// setup express
var app = express();
app.use(express.static("public"));

// setup spotify api
var spotifyApi = new spotifyWebApi({
    clientId: "55594669db674d2587b74bc6cb36a39b",
    clientSecret: "91579fa5acd64ae28dcc18205fe95428"
});

// retrieve access token from spotify
spotifyApi.clientCredentialsGrant().then(function(data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is " + data.body["access_token"]);
    spotifyApi.setAccessToken(data.body["access_token"]);
}, function(err) {
    console.log("Something went wrong when retrieving an access token:", err.message);
});

// -- Functions --
async function getTracks(searchTerm, res) {
    spotifyApi.searchTracks(searchTerm)
        .then(function(data) {
            var tracks = data.body.tracks.items;
            var htmlResponse = "";

            for (let i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                htmlResponse += `
                    <div>
                        <h2>${track.name}</h2>
                        <h4>${track.artists[0].name} (Artist ID: ${track.artists[0].id})</h4>
                        <img src="${track.album.images[0].url}">
                        <p><a href="${track.external_urls.spotify}">Track Details</a></p>
                    </div>
                `;
            }

            res.send(htmlResponse);
        }, function(err) {
            console.error("Something went wrong!", err);
        });
}

async function getTopTracks(artist, res) {
    spotifyApi.getArtistTopTracks(artist, "GB")
        .then(function(data) {
            var tracks = data.body.tracks;
            var htmlResponse = "";

            for (let i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                htmlResponse += `
                    <div>
                        <h2>${track.name}</h2>
                        <h4>By ${track.artists[0].name} (Artist ID: ${track.artists[0].id})</h4>
                        <img src="${track.album.images[0].url}">
                        <p><a href="${track.external_urls.spotify}">Play on Spotify</a></p>
                    </div>
                `;
            }

            res.send(htmlResponse);
        }, function(err) {
            console.error("Something went wrong!", err);
        });
}

async function getRelatedArtists(artist, res) {
    spotifyApi.getArtistRelatedArtists(artist)
        .then(function(data) {
            res.send(JSON.stringify(data.body));
        }, function(err) {
            console.error("Something went wrong!", err);
        });
}

async function getTracksAPI(searchTerm, res) {
    spotifyApi.searchTracks(searchTerm)
        .then(function(data) {
            var tracks = data.body.tracks.items;
            var jsonResponse = [];

            for (let i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                jsonResponse.push({
                    trackName: track.name,
                    artist: track.artists[0].name,
                    image: track.album.images[0].url,
                    url: track.external_urls.spotify
                });
            }

            res.send(jsonResponse);
        }, function(err) {
            console.error("Something went wrong!", err);
        });
}

// -- Routes --
app.get("/", function(req, res) {
    res.send("Hello world! by express (lab 12)");
});

app.get("/searchlove", function(req, res) {
    getTracks("love", res);
});

app.get("/search", function(req, res) {
    var searchTerm = req.query.searchterm;
    getTracks(searchTerm, res);
});

app.get("/gettoptracks", function(req, res) {
    getTopTracks(req.query.artistId, res);
});

app.get("/getrelatedartists", function(req, res) {
    // This route appears to error often saying the artist ID
    // is not found, even though it is valid. Must be an issue
    // on spotify's end.
    getRelatedArtists(req.query.artistId, res);
});

app.get("/searchAPI", function(req, res) {
    getTracksAPI(req.query.searchTerm, res);
});

app.listen(8080);