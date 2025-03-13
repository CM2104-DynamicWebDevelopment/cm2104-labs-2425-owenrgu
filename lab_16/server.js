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
  
  socket.on('join room', function(data) {
    socket.join(data.room);
    console.log(`${data.username} joined room: ${data.room}`);
    
    socket.to(data.room).emit('chat message', {
      username: 'System',
      text: `${data.username} has joined the room`,
      room: data.room
    });
  });
  
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('chat message', function (msgData) {
    // Send message only to the specific room
    io.to(msgData.room).emit('chat message', msgData);
  });
})

http.listen(8080, function () {
  console.log("listening on *:8080");
});