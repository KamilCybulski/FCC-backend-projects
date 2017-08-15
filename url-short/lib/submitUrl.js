const $ = require('./shortener.js');


/**
 * db is a refernece to a Database
 * res is a reference to a response object
 * url is String - a url submitted by user
 * appUrl is String - app's base url
 */

function *submitUrl(db, res, url, appUrl) {

  try {
    yield $.checkIfValid(url);
  }
  catch (e) {
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
    db.close();
    res.json({long_url: url, short_url: short});
  }
  catch(e) {
    db.close();
    res.json({error: "Internal server error"});
    return;
  }

}

module.exports = submitUrl;

