const blankCost = 1.0;
const blankProxCost = 1.0;
const blankUnevenCost = 1.0;
const hypCost = 1.0;
// ==========================================
// Functions available:
/*
splitLine(line, width)
input:
line: [String]
width: Number

Output:
[[String], [String]]
*/
/*
lineBreaks(dict, width, line)
input:
dict: {String : [String]}
width: Number
line: [String]

Output:
[[[String], [String]]]
*/
/*
blankInsertions(num, line)
input:
num: Number
line: [String]

Output:
[[String]]
*/
// ==========================================
/*
input:
line: [String]

Output:
Number
*/

module.exports = function lineCost (line) {
  let blankPositions = blankPlacements(line, 0);
  let average = getBlankPositionsAvg(blankPositions);
  let variance = getBlankPositionsVariance(blankPositions, average);
  let hyphenCount = getHyphenCount(line);
  let numberOfBlanks = getBlankCount(line);
  return calculateCost(numberOfBlanks, line.length, average, variance, hyphenCount);
}

function blankPlacements (line, position) {
  if (line.length === 0) return [position];

  let [head, ...rest] = line;

  if (head === ' ') return [position, ...blankPlacements(rest, 0)];

  return blankPlacements(rest, position + 1);
}

function calculateCost (numberOfBlanks, lineLength, average, variance, hyphenCount) {
  return blankCost * numberOfBlanks
    + blankProxCost * (lineLength - average)
    + blankUnevenCost * variance
    + hypCost * hyphenCount;
}

function getBlankPositionsAvg (blankPositions) {
  let sum = blankPositions.reduce((prev,acc)=> prev + acc ,0);
  return sum / blankPositions.length;
}

function getBlankPositionsVariance (blankPositions, average) {
  let sumSqrtDiff = blankPositions
    .map(postion => (postion - average) ** 2)
    .reduce((prev,curr) => prev + curr, 0);
  return sumSqrtDiff / blankPositions.length;
}

function getHyphenCount (line) {
  return line
    .map(word => hasHyphen(word) ? 1 : 0)
    .reduce((prev,acc)=> prev + acc ,0);
}

function hasHyphen (word) {
  return word.match(/[-]/g);
}

function getBlankCount (line) {
  return line
    .map(word => word === ' ' ? 1 : 0)
    .reduce((prev,acc)=> prev + acc, 0);
}
