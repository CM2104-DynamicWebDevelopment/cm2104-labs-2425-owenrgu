var express = require("express");
var spotifyWebApi = require("spotify-web-api-node");

var app = express();
app.use(express.static("public"));

var spotifyApi = new spotifyWebApi({
    clientId: "55594669db674d2587b74bc6cb36a39b",
    clientSecret: "91579fa5acd64ae28dcc18205fe95428"
});

app.get("/", function(req, res) {
    res.send("Hello world! by express");
});

app.listen(8080);