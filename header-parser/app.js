const express = require('express');
const parser = require('./lib/parse.js');
const app = express();

app.get('/api', (req, res) => {

  const data = {
    ip: req.ip,
    lang: parser.parseLang(req.headers["accept-language"]),
    software: parser.parseOS(req.headers["user-agent"])
  } 

  res.json(data)
});



app.listen(3000, () => {
  console.log("Express listening on port 3000. Press CTRL + C to terminate.")
});