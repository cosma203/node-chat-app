var socket = io();

socket.on('connect', function() {
  console.log('Connected to server!');

  socket.emit('createMessage', {
    from: 'Milos',
    text: 'Yup, that works for me!'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from the server!');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
