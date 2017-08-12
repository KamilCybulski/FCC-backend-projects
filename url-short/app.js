const express = require('express');
const config = require('./config/config.js')
const assert = require('assert');
const Mongo = require('mongodb');
const run = require('./lib/generatorRunner.js');
const submitUrl = require('./lib/submitUrl.js');
const redirectUser = require('./lib/redirectUser.js');


const app = express();
app.use(express.static(__dirname + "/public"));

app.get('/submit/*', (req, res) => {

  const input = req.url.slice(8);
  const appUrl = `${req.protocol}://${req.get('host')}`;

  Mongo.connect(config.URL, (err, db) => {
    assert.equal(null, err)

    run(submitUrl, db, res, input, appUrl);
  });
});


app.get('/docs', (req, res) => {
  res.sendFile(__dirname + "/public/docs.html");
});


app.get('/*', (req, res) => {

  const input = req.originalUrl.slice(1);
  Mongo.connect(config.URL, (err, db) => {
    assert.equal(null, err);

    redirectUser(db, res, input);
  });
});


app.listen(config.PORT, () => {
  console.log(`Server is listening on PORT ${config.PORT}. Press CTRL + C to terminate.`)
});

