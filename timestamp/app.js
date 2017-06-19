const express = require('express');
const path = require('path');
const timeservice = require('./lib/time-service.js')
const app = express();

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});


app.get('/:input', (req, res) => {
  const input = req.params.input;
  res.json(timeservice(input));
});


app.listen(3000, () => {
  console.log("Express listening on port 3000. Press CTRL + C to terminate.")
});