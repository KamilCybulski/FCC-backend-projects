const $ = require('./shortener.js');


/**
 * db is a refernece to a Database
 * res is a reference to a response object
 */

function *submitUrl(db, res, url, appUrl) {

  try {
    yield $.checkIfValid(url);
  }
  catch (e) {
    console.log(e);
    res.json({error: "Invalid input. Please provide an actual url"});
    return;
  }


  try {
    yield $.checkIfExits(db, url);
  }
  catch(e) {
    db.close();
    res.json({error: `This url has been already shortened: ${appUrl+ '/' + e}`});
    return;
  }


  try {
    const counter = yield $.getNextCounter(db);
    const hash = $.encode(counter.value.lastIdx);
    const short = appUrl + '/' + hash;

    yield $.saveUrls(db, url, hash);
    res.json({long_url: url, short_url: short});
  }
  catch(e) {
    db.close();
    console.log(e);
    res.json({error: "Internal server error"});
    return;
  }

}

module.exports = submitUrl;

