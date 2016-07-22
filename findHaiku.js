var fs = require('fs')
var haiku = require('./haiku');

var cmudictFile = haiku.readCmudictFile('./cmudict.txt');
var gutenbergFile = haiku.readCmudictFile('./pg1342.txt');

function cmudictObj(data) {
	var lines = data.toString().split("\n"),
       lineSplit, syllablesObj = {};
  lines.forEach(function(line){    
    lineSplit = line.split("  "); 
    if (lineSplit[1] !== undefined) {
    	var sylls = lineSplit[1].match(/\d/g);
	    if (sylls === null) {
	    	var syllcount = 0;
	    } 
	    else {syllcount = sylls.length;}
	    syllablesObj[lineSplit[0]] = syllcount;
    }
  });
  return  syllablesObj;
}

var syllablesObj = cmudictObj(cmudictFile);

function formatFile(file) {
	var words = file.toString().match(/\w+/gi);
	return words;
}

var fileArr = formatFile(gutenbergFile);


function findHaiku(structure, dic, arr) {
	var fileInSyll = arr.map(function(value){
		return dic[value.toUpperCase()];
	})
	var narr = structure[0];
	for (var i = 1; i < structure.length; i++){
		narr = narr.concat(structure[i]);
	}
	for (var j = 0; j < fileInSyll.length - narr.length +1; j++){ 
		if (fileInSyll.slice(j, j+narr.length).toString() === narr.toString()){
			var haiku = arr.slice(j, j+narr.length);
			break;
		}
	}
	//return haiku;
	if (haiku === undefined){
		return "No Haiku in structure "+structure+" is found."
	} else{
		return structure.map(function(lines){
			var words = haiku.splice(0,lines.length)
			return words.join(' ')
		}).join('\n')
	}
	
}
var structure = [[1,1,1],[2,3,1,1],[1,2,3]]
console.log(findHaiku(structure, syllablesObj, fileArr))