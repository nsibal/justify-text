/*
input:
line: [String]
width: Number

Output:
[[String], [String]]
*/
module.exports = function splitLine (line, width) {
  if (line.length === 0) return [[], []];

  let [head, ...rest] = line;

  if (width === 0 || head.length > width) return [[], line];

  let firstHalf = [head];
  let secondHalf = [];

  let [first, second] = splitLine(rest, width - (head.length + 1));
  first.forEach(word => firstHalf.push(word));
  second.forEach(word => secondHalf.push(word));

  return [firstHalf, secondHalf];
}
