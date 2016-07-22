var fs = require('fs')
var haiku = require('./haiku');

var cmudictFile = haiku.readCmudictFile('./cmudict.txt');
var syllablesArr = haiku.formatData(cmudictFile);

console.log(haiku.createHaiku([[5],[7],[5]], syllablesArr))

console.log('\n');
var structure = [
  [2,3],
  [1,3,3],
  [3,2]
]
console.log(haiku.createHaiku(structure, syllablesArr))