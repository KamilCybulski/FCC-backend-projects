const express = require('express');
const config = require('./config/config.js');
const multer = require('multer');

const app = express();
const upload = multer({dest: 'uploads/'});

app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});


app.post('/size', upload.single('file'), (req, res, next) => {
  res.json({size: req.file.size})
});



app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}. Press CTRL + C to terminate`);
});