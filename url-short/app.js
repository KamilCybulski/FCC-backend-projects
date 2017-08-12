const express = require('express');
const config = require('./credentials/config.js')
const assert = require('assert');
const Mongo = require('mongodb');
const run = require('./lib/generatorRunner.js');
const submitUrl = require('./lib/submitUrl.js');
const redirectUser = require('./lib/redirectUser.js');


const app = express();


app.get('/submit/*', (req, res) => {

  const input = req.path.slice(8);
  const appUrl = `${req.protocol}://${req.get('host')}`;

  Mongo.connect(config.URL, (err, db) => {
    assert.equal(null, err)

    run(submitUrl, db, res, input, appUrl);
  });
});


app.get('/*', (req, res) => {

  const input = req.originalUrl.slice(1);
  console.log(input);
  Mongo.connect(config.URL, (err, db) => {
    assert.equal(null, err);

    redirectUser(db, res, input);
  });
});


app.listen(config.PORT, () => {
  console.log(`Server is listening on PORT ${config.PORT}. Press CTRL + C to terminate.`)
});

