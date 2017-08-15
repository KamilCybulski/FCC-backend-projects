const getData = require('./get-search-results.js').getData;
const parseData = require('./get-search-results.js').parseData;
const saveToDB = require('./get-search-results.js').saveToDB;
const displayResults = require('./get-search-results.js').displayResults;

function *sendImgData (db, res, query, offset, count) {


  try {
    var data = yield getData(query, offset, count);
  }
  catch(e) {
    db.close();
    return res.json({status: "fail", error: "Cannot get img data"});
  }


  try {
    yield saveToDB(db, query);
  }
  catch(e) {
    db.close();
    return res.json({status: "fail", error: "Internal server error"});
  }


  try {
    yield displayResults(res, parseData(data))
  }
  catch(e) {
    return res.json({status: "fail", error: "Cannot display data"});
  }
}

module.exports = sendImgData;