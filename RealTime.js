var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

var numUsers = 1;

io.sockets.on('connection', function (socket) {
  //Upphafsstaða notenda skráðra inn
  socket.emit('Index', numUsers);

  socket.on('UpdateHeader', function(message){
    socket.broadcast.emit('news', message);
    socket.emit('news', message);
  });
  socket.on('UsersLoggedIn', function (data) {
    numUsers = data.obj;
    socket.broadcast.emit('Index', data);
    socket.emit('Index', data);
  });


});