// Setup DB
const mongoClient = require("mongodb-legacy").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const client = new mongoClient(url);
const dbName = "star_wars_quotes";

// Setup App
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Connect DB
var db;
connectDB();

async function connectDB() {
    await client.connect();
    console.log("Connected successfully to server.");
    db = client.db(dbName);
    app.listen(8080);
}

// Routes
app.get("/all", function(req, res) {
    db.collection("quotes").find().toArray(function(err, result) {
        if (err) throw err;

        var output = "<h1>All the quotes</h1>";
        for (var i = 0; i < result.length; i++) {
            output += `
                <div>
                    <h3>${result[i].name}</h3>
                    <p>${result[i].quote}</p>
                
            `;
        }
        res.send(output);
    });
});

app.post("/quotes", function(req, res) {
    db.collection("quotes").insertOne(req.body, function(err, result) {
        if (err) throw err;
        console.log("Saved to database");
        res.redirect("/");
    });
});

app.post("/search", function(req, res) {
    req.body.name = req.body.name.toLowerCase();

    db.collection("quotes").find(req.body).toArray(function(err, result) {
        if (err) throw err;

        var output = "<h1>All the quotes</h1>";
        for (var i = 0; i < result.length; i++) {
            output += `
                <div>
                    <h3>${result[i].name}</h3>
                    <p>${result[i].quote}</p>
                </div>
            `;
        }
        res.send(output);
    });
});