
module.exports = (db, res) => {

  const getHistory = () => {
    const cursor = db.collection('history').find({}, {_id: 0})
    cursor.sort({_id: -1});
    cursor.limit(10);

    return cursor.toArray();
  };

  return getHistory()
          .then(history => res.json({status: "success", history}))
          .catch(err => res.json({status: "failed", error: "Database error"}))
};