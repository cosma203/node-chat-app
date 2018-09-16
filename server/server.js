// const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

// --Middleware--

app.use(express.static('public'));

// --Socket events--

io.on('connection', function(socket) {
  console.log('New user connected!');

  socket.emit('newMessage', {
    from: 'John',
    text: 'See you then!',
    createdAt: 123123
  })

  socket.on('createMessage', function(message) {
    console.log('createMessage', message);
  });

  socket.on('disconnect', function() {
    console.log('User disconnected!');
  });
});

server.listen(port, function(err) {
  if (err) {
    console.log(err.message);
  }
  console.log(`Listening on ${port}...`);
});
