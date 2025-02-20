// libraries
var express = require("express");

// setup express app
var app = express();
app.set("view engine", "ejs");

// routes
// index page
app.get("/", function(req, res) {
    res.render("pages/index");
});

// about page
app.get("/about", function(req, res) {
    res.render("pages/about");
});

app.listen(8080);
console.log("Listening on 8080!");