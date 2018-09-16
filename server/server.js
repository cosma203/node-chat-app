// const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// --Middleware--

app.use(express.static('public'));

app.listen(port, function(err) {
  if (err) {
    console.log(err.message);
  }

  console.log(`Listening on ${port}...`);
});
