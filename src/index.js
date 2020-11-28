const lineCost = require('./line-cost.js');
const justifyText = require('./justify-text.js');

const enHyp = {
  "creative" : ["cr","ea","ti","ve"],
  "controls" : ["co","nt","ro","ls"],
  "achieve" : ["ach","ie","ve"],
  "future" : ["fu","tu","re"],
  "present" : ["pre","se","nt"],
  "motivated" : ["mot","iv","at","ed"],
  "desire" : ["de","si","re"],
  "others" : ["ot","he","rs"],
}

let width = 15;
let text = "He who controls the past controls the future. He who controls the present controls the past.";

console.log(justifyText(lineCost, enHyp, width, text));
