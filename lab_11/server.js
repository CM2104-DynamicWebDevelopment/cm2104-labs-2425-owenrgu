var express = require("express");
var app = express();

// route 1
app.get("/", function(req, res) {
    res.send("Hello world! by express");
});

// route 2
app.get("/test", function(req, res) {
    res.send("this is route 2");
});

app.listen(8080);