
module.exports = {

  parseLang: function(str) {
    const regex = /[a-z]{2}(?:-[A-Za-z]{2})?/;

    return str.match(regex)[0];
  },

  parseOS: function(str) {

    /**
     * It's worth noting that the value of user-agent header is set by the client arbitrairly. So if any browser vendor decide to format the string differently then this function won't work.
     */

     const regex = /\(([^\)]+)\)/;

     return str.match(regex)[1];

  }

}


