const express = require('express');
const MongoClient = require('mongodb');
const config = require('./config/config.js');
const sendImgData = require('./lib/send-image-data.js');
const run = require('./lib/run.js');

const app = express();

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get('/images', (req, res) => {
  const query = req.query.q;
  const offset = req.query.offset;
  const count = req.query.count;

  MongoClient.connect(config.dbURL, (err, db) => {
    run(sendImgData, db, res, query, offset, count)
  });
  
});






app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}. Press CTRL + C to terminate.`);
});