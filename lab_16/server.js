const express = require('express');

const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get("/", function (req, res) {
  res.render("pages/index");
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('chat message', function (msgData) {
    io.emit('chat message', msgData);
  });
})

http.listen(8080, function () {
  console.log("listening on *:8080");
});