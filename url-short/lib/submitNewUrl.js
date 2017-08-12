const $ = require('./shortener.js');


/**
 * db is a refernece to a Database
 * res is a reference to a response object
 * 
 */

function *submitUrl(db, res, url, appUrl) {

  try {
    yield $.checkIfValid(url);
  }
  catch (e) {
    console.log(e);
    res.json({error: "Invalid input. Please provide an actual url"});
    return Promise.reject();
  }


  try {
    yield $.checkIfExits(db, url);
  }
  catch(e) {
    db.close();
    res.json({error: `This url has been already shortened: ${e}`});
    return Promise.reject();
  }


  try {
    let counter = yield $.getNextCounter(db);
    counter = counter.value.lastIdx;
    const short = appUrl + '/' + $.encode(counter);

    yield $.saveUrls(db, url, short);
    res.json({long_url: url, short_url: short});
  }
  catch(e) {
    db.close();
    console.log(e);
    res.json({error: "Internal server error"});
    return Promise.reject();
  }

}

module.exports = submitUrl;

