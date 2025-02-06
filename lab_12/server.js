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
            res.send(JSON.stringify(data.body));
        }, function(err) {
            console.error(err);
        });
}

// -- Routes --
app.get("/", function(req, res) {
    res.send("Hello world! by express");
});

app.get("/searchlove", function(req, res) {
    getTracks("love", res);
});

app.listen(8080);