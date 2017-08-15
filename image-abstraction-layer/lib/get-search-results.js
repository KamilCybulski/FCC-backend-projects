const axios = require('axios');

    
module.exports = {

/**
 *  String String String -> Promise
 *  Fetches image search data from Qwant API
 */
getData: function(query, offset, count) {

  const offsetParam = offset ? `&offset=${offset}` : "&offset=1";
  const countParam = count ? `&count=${count}` : "&count=10";

  const url = `https://api.qwant.com/api/search/images?q=${query + offsetParam + countParam}`;

  return axios.get(url)
    .then((res) =>({status: "success", data: res.data.data.result.items}))
},


/**
 * Object -> Object
 * removes unnecessary data
 */
parseData: function(obj) {

  const filterImgData = (obj) => ({
    title: obj.title,
    img: obj.media,
    url: obj.url
  });

  return {
    status: obj.status,
    data: obj.data.map(filterImgData)
  }

},

/**
 * Db Query -> Promise
 * Db is reference to the database
 * Query is String
 * Saves the query to the database
 */
saveToDB: function(db, query) {

  const date = new Date();
  return db.collection('history').insertOne({query, date})
    .then(
      () => db.close(),
      () => db.close()
    )
},


/**
 * Res Obj -> undefined
 * Res is a reference to the response object
 * Obj is an object that containes parsed search results
 * Displays results to the user in json format
 */
displayResults: function(res, obj) {
  return res.json(obj);
},


/**
 * Db -> undefined
 */

}


