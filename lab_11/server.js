var express = require("express");
var knockknock = require("knock-knock-jokes");

var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

app.post("/postform", function(req, res) {
    var name = req.body.name;
    var quest = req.body.quest;
    res.send("Hi " + name + "! I am sure you will " + quest);
});

// route parameters
app.get("/user/:userID/books/:bookID", function(req, res) {
    var userID = req.params.userID;
    var bookID = req.params.bookID;
    res.send("User ID: " + userID + " | Book ID: " + bookID);
});

// 404 page not found
app.use(function(req, res, next) {
    res.send("This page does not exist!");
});

app.listen(8080);