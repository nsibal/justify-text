const lineBreaks = require('./line-breaks.js');
const blankInsertions = require('./blank-insertions.js');

/*
input:
lineCostFunc: {Function : [String] -> Number}
dict: {String: [String]}
width: Number
line: [String]

Output:
[[String],[String]]
*/
module.exports = function bestLineBreak (lineCostFunc, dict, width, line) {
  let possibleLines = lineBreaks (dict, width, line);
  let blankInserted = insertBlanks(possibleLines, width);
  let maxLength = getMaxLength(blankInserted);
  let filteredLines = blankInserted.filter(line => lineLength(line[0]) === maxLength);
  return getMinCostLine(filteredLines, lineCostFunc);
}

function insertBlanks (lines, width) {
  return lines
    .map(line => insertedBlanks(line, width))
    .reduce((prev, curr) => prev.concat(curr), []);
}

function insertedBlanks (line, width) {
  return blankInsertions(width - lineLength(line[0]), line[0])
    .map(insertedLine => [insertedLine, line[1]]);
}

function lineLength (line) {
  if (line.length === 0) return 0;

  if (line.length === 1) return line[0].length;

  let length = 1 + lineLength(line.slice(1));

  if (line[0] !== ' ') length += line[0].length;

  return length;
}

function getMaxLength (lines) {
  return lines
    .reduce((max, curr) => {
      return max > lineLength(curr[0]) ? max : lineLength(curr[0]);
    },
    lineLength(lines[0][0])
  );
}

function getMinCostLine (lines, lineCostFunc) {
  return lines
    .reduce((min, curr) => {
      return lineCostFunc(min[0]) > lineCostFunc(curr[0]) ? curr : min;
    },
    lines[0]
  );
}
