module.exports = {

   /**
  * url is a String
  * check if given string is a valid url
  * returns a promise
  */
  checkIfValid: function (url) {
    return new Promise((resolve, reject) => {

      const regexp = /(http[s]?\:\/\/).*/;

      if(regexp.test(url)) {
        resolve();
      } 
      else {
        reject();
      }
 });
},


/**
  * db is a reference to a database
  * url is a String
  * check if given String exists in a database
  * returns a promise
  */
  checkIfExits: function (db, url){
    return new Promise((resolve, reject) => {

    db.collection('urls').findOne(
      {long_url: url},
      {_id: 0, short_url: 1}
    )
    .then(
      (doc) => {
        if (doc === null) {
          resolve();
        }
        else {
          reject(doc.short_url);
        }
      },
      (err) => {
        reject();
      }
    )
  });
},


/**
 * db is a reference to a database
 * get the counter and increment it by 1 afterwards
 * returns a promise
 */
getNextCounter: function (db) {

 return db.collection('counters').findOneAndUpdate(
    {colName: 'urls'},
    {$inc: {lastIdx: 1}});
},


/**
 * db is a reference to a database
 * long, short are Strings
 * save both string to a database
 * returns a promise
 */
saveUrls: function (db, long, short) {
  
  return db.collection('urls').insertOne({
    long_url: long,
    short_url: short
  });
 },


/**
   * Algorithm taken from:
   * https://github.com/delight-im/ShortURL/blob/master/JavaScript/ShortURL.js
   * 
   * Number -> String
   * produce a unique string from a given number;
   */
encode: function (num) {

  const charPool = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
  const base = charPool.length;

  let str = "";

  while(num > 0) {
    str += charPool.charAt(num % base);
    num = Math.floor(num / base);
  }
  return str;
}

};
