const parse = require('date-fns/parse');
const isValid = require('date-fns/is_valid');
const format = require('date-fns/format');

module.exports = (input) => {
  const regex = /^[0-9]{10}$/;

  const t = input.match(regex) ? parse(Number(input)*1000) : parse(input);
  if(isValid(t)){
    return {
      unix: format(t, "X"),
      natural: format(t, "MMMM Do YYYY")
    }
  }
  else {
    return {
      unix: null,
      natural: null
    }
  }
}