const bestLineBreak = require('./best-line-break.js');

/*
input:
lineCostFunc: {Function : [String] -> Number}
dict: {String: [String]}
width: Number
line: String

Output:
[[String]]
*/
module.exports = function justifyText (lineCostFunc, dict, width, text) {
  return justifyTextHelper(lineCostFunc, dict, width, text.split(' '));
}

function justifyTextHelper (lineCostFunc, dict, width, text) {
  let [first, second] = bestLineBreak(lineCostFunc, dict, width, text);

  if (second.length === 0) return [text];

  return [first, ...justifyTextHelper(lineCostFunc, dict, width, second)];
}
