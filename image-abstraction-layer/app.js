const express = require('express');
const MongoClient = require('mongodb');
const config = require('./config/config.js');
const sendImgData = require('./lib/send-image-data.js');
const run = require('./lib/run.js');
const getHistory = require('./lib/get-search-history.js').getHistory;

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
    if(err) {
      return res.json({status: "fail", error: "No database connection"});
    }
    else {
      return run(sendImgData, db, res, query, offset, count);
    }
    
  });
});


app.get('/history', (req, res) => {

  MongoClient.connect(config.dbURL, (err, db) => {
    if(err) {
      return res.json({status: "fail", error: "No database connection"});
    }
    else {
      getHistory(db)
        .then((history) => res.json({status: "success", history: history}))
        .catch((err) => res.json({status: "fail", error: "Database error"}))
        .then(() => db.close())
    }
  });
});






app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}. Press CTRL + C to terminate.`);
});