const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MongoClient = require('mongodb');
const dbURL = require('../config/config.js').testDbURL;

const getData = require('../lib/get-search-results.js').getData;
const parseData = require('../lib/get-search-results.js').parseData;
const saveToDB = require('../lib/get-search-results.js').saveToDB;

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("getData", function() {

  it("returns an object", function() {
    return assert.eventually.isObject(getData('cats', '1', '10'));
  });

  it("has a status property", function() {
    return assert.eventually.property(getData('cats', '1', '10'), "status");
  });

  it("amount of fetched items is correct", function() {
    return assert.eventually
      .lengthOf(getData('cats', '1', '10').then(obj=>obj.data), 10);
  });

});

describe("parseData", function() {

  const testObj = {
    status: "success",
    data: [
      {
        "title": "Persian Cats And Kittens",
        "type": "image",
        "media": "http://cdn2-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-10.jpg",
        "desc": "",
        "thumb_width": 248,
        "thumb_height": 200,
        "width": "680",
        "height": "548",
        "size": "39863",
        "url": "http://cattime.com/cat-breeds/persian-cats#!",
        "_id": "4ee431889aa04a71937382dcb557ae06",
        "b_id": "OIP.yi58QBMe2miGuxTQCuJ5igEsDx",
        "media_fullsize": "just a string",
        "thumb_type": "jpg",
        "count": 9
      },
      {
        "title": "Some other Cats",
        "type": "image",
        "media":"https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
        "desc": "",
        "thumb_width": 248,
        "thumb_height": 200,
        "width": "680",
        "height": "548",
        "size": "39863",
        "url": "http://cattime.com/cat-breeds/persian-cats#!",
        "_id": "4ee431889aa04a71937382dcb557ae06",
        "b_id": "OIP.yi58QBMe2miGuxTQCuJ5igEsDx",
        "media_fullsize": "just a string",
        "thumb_type": "jpg",
        "count": 9
      },
    ]
  }

  const resultObj = {
    status: "success",
    data: [
      {
        title: "Persian Cats And Kittens",
        img:"http://cdn2-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-10.jpg",
        url: "http://cattime.com/cat-breeds/persian-cats#!"
      },
      {
        title: "Some other Cats",
        img: "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
        url: "http://cattime.com/cat-breeds/persian-cats#!"
      }
    ]
  }



  it("parses properly", function() {
    assert.deepEqual(parseData(testObj), resultObj);
  });

});