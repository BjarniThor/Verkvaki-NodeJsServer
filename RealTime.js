var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server, {transports:['flashsocket', 'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']});


var bleh = [];

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
  socket.on('UpdateHeader', function(message){
    socket.broadcast.emit('news', message);
    socket.emit('news', message);
  });
  socket.on('CreateProj', function (data) {
    bleh.push(data);
  });


});

port = process.env.PORT || 3000;
server.listen(port);
