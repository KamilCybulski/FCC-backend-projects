const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const axios = require('axios');

const getSearchResults = require('../lib/get-search-results.js');
const getSearchHistory = require('../lib/get-search-history.js');

chai.use(chaiAsPromised);
chai.should();
process.env.NODE_ENV = "test";


describe('getSearchResults works', function() {
  const testURL = 'http://localhost:3000/images?q=metal&offset=1&count=15';

  it("Fetches the results from external API", function() {
    return axios.get(testURL).then(json => json.data).should.eventually.have.property("data")
  });

  it("Fetches the correct number of results", function() {
    return axios.get(testURL).then(json => json.data.data).should.eventually.have.lengthOf(15);
  });

  it("Reports a success", function() {
    return axios.get(testURL).then(json => json.data.status).should.eventually.equal("success");
  });

});


describe("getSearchHistory works", function() {
  const testURL =  'http://localhost:3000/history';

  it("Reports a success", function() {
    return axios.get(testURL).then(json => json.data.status).should.eventually.equal("success");
  });

  it("Returns 10 items from the database", function() {
    return axios.get(testURL).then(json => json.data.history).should.eventually.have.lengthOf(10);
  });

  it("Returned items have a 'query' property", function() {
    return axios.get(testURL).then(json => json.data.history[0]).should.eventually.have.property("query");
  });

});