const assert = require('assert');
const encode = require('../lib/encode.js')
const getNextIndex = require('../lib/getNextIndex.js')


describe('encode()', function() {

  it("Number -> String", function() {
    assert.equal("string", typeof encode(12345));
  });

  it("3 digit Number -> String.length == 3", function() {
    assert.equal(3, encode(12345).length);
  });

});
