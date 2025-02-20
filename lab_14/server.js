// libraries
var express = require("express");

// setup express app
var app = express();
app.set("view engine", "ejs");

// routes
// index page
// app.get("/", function(req, res) {
//     res.render("pages/index");
// });

app.get("/", function(req, res) {
    var drinks = [
        { name: "Bloody Mary", drunkness: 3 },
        { name: "Martini", drunkness: 5 },
        { name: "Scotch", drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for more than 6 months might as well have been written by someone else.";

    res.render("pages/index", {
        drinks: drinks,
        tagline: tagline
    });
});

// about page
app.get("/about", function(req, res) {
    res.render("pages/about");
});

app.listen(8080);
console.log("Listening on 8080!");