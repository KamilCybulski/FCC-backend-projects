/**
 * db is a reference to the database
 * res is a reference to the reference object
 * url is a String
 * 
 * Check if given url is already in the database;
 * if it is -> redirect user
 * if it's not -> send an error message
 */

 const redirectUser = (db, res, url) => {

  db.collection('urls').findOne(
    {short_url: url},
    {_id: 0, short_url: 0}
  )
  .then(
    (doc) => {
      if (doc !== null) {
        res.redirect(doc.long_url);
      }
      else {
        res.json({error: `No such url database.`})
      }
    },
    (err) => {
      console.log(err);
      res.json({error: "Connection error"});
    }
  )
 }

 module.exports = redirectUser;