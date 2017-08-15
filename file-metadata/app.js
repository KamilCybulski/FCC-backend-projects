const express = require('express');
const config = require('./config/config.js');

const app = express();

app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
  res.send("elo elo trzy dwa zero");
});


app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}. Press CTRL + C to terminate`);
});