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
// ==========================================
/*
input:
num: Number
line: [String]

Output:
[[String]]
*/

module.exports = function blankInsertions (num, line) {
  if (num === 0 || line.length <= 1) return [line];

  let lines = blankInsertions(num - 1, line);
  let flat = flatInsert(lines);
  return Array.from(new Set(flat.map(JSON.stringify)), JSON.parse);
}

function flatInsert (lines) {
  return lines.map(line => singleBlankInsert(line))
              .reduce((prev, curr)=> prev.concat(curr), []);
}

function singleBlankInsert (line) {
  if (line.length <= 1) return [line];

  if (line.length === 2) return [[line[0],' ',line[1]]];

  let [head, ...tail] = line;
  let right = singleBlankInsert(tail);
  let result = right.map(line => [head, ...line]);
  result.push([head, ' ', ...tail]);
  return result;
}
