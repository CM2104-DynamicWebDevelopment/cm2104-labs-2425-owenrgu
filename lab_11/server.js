var express = require("express");
var knockknock = require("knock-knock-jokes");

var app = express();
app.use(express.static("public"));

// route 1
app.get("/", function(req, res) {
    res.send("Hello world! by express");
});

// route 2
app.get("/test", function(req, res) {
    res.send("this is route 2");
});

// route 3
app.get("/joke", function(req, res) {
    res.send(knockknock());
});

// route 4
app.get("/add", function(req, res) {
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);
    res.send("x + y =" + (x+y));
});

// form
app.get("/getform", function(req, res) {
    var name = req.query.name;
    var quest = req.query.quest;
    res.send("Hi " + name + "! I am sure you will " + quest);
});

app.listen(8080);