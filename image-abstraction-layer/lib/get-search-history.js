module.exports = {

  /**
   * Db -> Promise (Array of Objects)
   * Db is a reference to database
   * retrieves the search history from a database
   */
  getHistory: function(db) {
    const cursor = db.collection('history').find({}, {_id: 0})
    cursor.sort({_id: -1}); 
    cursor.limit(10);

    return cursor.toArray();
  },

}