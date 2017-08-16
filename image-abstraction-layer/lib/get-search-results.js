const axios = require('axios');

module.exports = (query, offset, count, res, db) => {

  const parseData = (json) => {

    const filterImgData = (data) => ({
      title: data.title,
      img: data.media,
      url: data.url
    });

    const imgData = json.data.data.result.items;

    return {
      status: "success",
      data: imgData.map(filterImgData)
    }
  };

  const saveToDB = () => {
    const date = new Date();
    db.collection('history').insertOne({query, date});
  }

  const handleData = (data) => (res.json(parseData(data)), saveToDB());

  const handleError = (err) => (res.json({
    status: "failed",
    error: "Cannot get search results",
  }));

  const offsetParam = offset ? `&offset=${offset}` : "&offset=1";
  const countParam = count ? `&count=${count}` : "&count=10";
  const url = `https://api.qwant.com/api/search/images?q=${query + offsetParam + countParam}`;

  return axios.get(url)
    .then(handleData, handleError)
}
