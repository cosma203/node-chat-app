// const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// --Middleware--

app.use(express.static('public'));

// --Socket events--

io.on('connection', function(socket) {
  console.log('New user connected!');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

  socket.on('createMessage', function(message, callback) {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', function(coords) {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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
