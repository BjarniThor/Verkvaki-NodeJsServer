var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server, {transports:['flashsocket', 'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']});


var numUsers = 0;
var bleh = ["Forstillt"];
var foo = [];

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
  //Upphafsstaða notenda skráðra inn
  socket.emit('Index', numUsers, bleh);
  socket.on('UpdateHeader', function(message){
    bleh.push(message);
    socket.broadcast.emit('news', message);
    socket.emit('news', message);
  });
  socket.on('UsersLoggedIn', function (data) {
    numUsers = data;
    socket.broadcast.emit('Index', data);
    socket.emit('Index', data);
  });

});

port = process.env.PORT || 3000;
server.listen(port);
