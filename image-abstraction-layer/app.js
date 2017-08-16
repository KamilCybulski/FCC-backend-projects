const express = require('express');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config.js');

const getSearchResults = require('./lib/get-search-results.js');
const getSearchHistory = require('./lib/get-search-history.js');

const app = express();
let db;

app.use(express.static(__dirname + "/public"));

MongoClient.connect(config.dbURL, (err, database) => {
  assert.equal(null, err);
  db = database;

  app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}. Press CTRL + C to terminate.`);
  });
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});


app.get('/images', (req, res) => {

  if(!req.query.q) {
    res.json({status: "failed", error: "No query"});
  }
  else {
    const {q, offset, count} = req.query;
    getSearchResults(q, offset, count, res, db);
  }

});


app.get('/history', (req, res) => {
  getSearchHistory(db, res); 
});
