const splitLine = require('./split-line.js');

/*
input:
dict: {String : [String]}
width: Number
line: [String]

Output:
[[[String], [String]]]
*/
module.exports = function lineBreaks (dict, width, line) {
  let [first, second] = splitLine(line, width);

  if (second.length === 0) return [[first, second]];

  let splitWord = removeTrailingPunc(second[0]);

  if (!dict.hasOwnProperty(splitWord)) return [[first, second]];

  let permutations = getPermutations([[],dict[splitWord]]);
  let splitAns = permutations.map(perm => getSplittedPerm(perm, first, second));
  let finAns = splitAns.filter(perm => isSmallerThan(perm, width));
  return finAns;
}

function removeTrailingPunc (word) {
  let splitArr = word.split('');

  if (isLetter(splitArr[splitArr.length - 1])) return word;

  splitArr.pop();
  return splitArr.join('');
}

function isLetter (char) {
  return (/[a-z]/i).test(char);
}

function getPermutations (arr){
  let [first, second] = arr;

  if (second.length === 0) return [[first, second]];

  let [x, ...xs] = second;
  let permute = [[...first, x], xs];
  let answer = getPermutations(permute);
  return [arr, ...answer];
}

function getSplittedPerm (perm, first, second) {
  let leftSide = getLeft(perm);
  let rightSide = getRight(perm, second);
  let splittedAns = [[...first], [rightSide, ...second.slice(1)]];

  if (leftSide.length) splittedAns[0].push(leftSide);

  return splittedAns;
}

function getLeft (perm) {
  if (perm[0].length) return perm[0].join('').concat('-');

  return [];
}

function getRight (perm, second) {
  if (second[0].match(/[.,]/)) return perm[1].join('') + second[0].substr(-1);

  return perm[1].join('');
}

function isSmallerThan (perm, width) {
  let total = perm[0].reduce((prev, curr) => curr.length + prev + 1, 0) -1;
  return total <= width;
}
