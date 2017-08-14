const express = require('express');
const MongoClient = require('mongodb');
const config = require('./config/config.js');

const app = express();


app.get('/', (req, res) => {
  res.send("Hello world");
})






app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}. Press CTRL + C to terminate.`);
});