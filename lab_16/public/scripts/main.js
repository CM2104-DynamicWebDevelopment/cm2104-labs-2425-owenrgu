var socket = io();
var username = "Anonymous";

$("#set-username").click(function() {
    var newUsername = $("#username").val().trim();
    if (newUsername) {
        username = newUsername;
        $("#username-container").hide();
        $("#form").show();
    }
    return false;
});

$("#form").hide(); // Hide chat form until username is set

$("#form").submit(function() {
    var messageText = $("#input").val().trim();
    if (messageText) {
        var messageData = {
            username: username,
            text: messageText
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