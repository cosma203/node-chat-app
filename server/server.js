// const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

// --Middleware--

app.use(express.static('public'));

// --Socket events--

io.on('connection', function(socket) {
  console.log('New user connected!');

  socket.on('join', function(params, callback) {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required!');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', `Welcome to the ${params.room} room, ${params.name}!`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
    callback();
  });

  socket.on('createMessage', function(message, callback) {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', function(coords) {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', function() {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room!`));
    }
  });
});

server.listen(port, function(err) {
  if (err) {
    console.log(err.message);
  }
  console.log(`Listening on ${port}...`);
});
