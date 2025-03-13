var socket = io();
var username = "Anonymous";
var currentRoom = "";

$("#set-username").click(function() {
    var newUsername = $("#username").val().trim();
    var roomName = $("#room").val().trim();
    
    if (newUsername && roomName) {
        username = newUsername;
        currentRoom = roomName;
        
        socket.emit("join room", { username: username, room: currentRoom });
        
        $("#username-container").hide();
        $("#form").show();
        
        $("#messages").before("<div id='room-display'>Room: <strong>" + currentRoom + "</strong></div>");
    }
    return false;
});

$("#form").hide();

$("#form").submit(function() {
    var messageText = $("#input").val().trim();
    if (messageText) {
        var messageData = {
            username: username,
            text: messageText,
            room: currentRoom
        };
        socket.emit("chat message", messageData);
        $("#input").val("");
    }
    return false;
});

socket.on('chat message', function(msgData) {
    $('#messages').append("<li><strong>" + msgData.username + ":</strong> " + msgData.text + "</li>");
    window.scrollTo(0, document.body.scrollHeight);
});