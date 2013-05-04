var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

var bleh = [];

io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  socket.on('UpdateHeader', function(message){
    socket.emit('news', message);
  });
  socket.on('CreateProj', function (data) {
    bleh.push(data);
  });


});