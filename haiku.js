var fs = require("fs");
//var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n"),
       lineSplit, syllablesArr = [];
   lines.forEach(function(line){    
    lineSplit = line.split("  "); 
    if (lineSplit[1] !== undefined) {
    	var sylls = lineSplit[1].match(/\d/g);
	    if (sylls === null) {
	    	var syllcount = 0;
	    } 
	    else syllcount = sylls.length;
	    if (syllablesArr.length < syllcount + 1) {
	    	while(syllablesArr.length < syllcount + 1) {
	    		syllablesArr.push([]);
	    	}
	    } 
	    syllablesArr[syllcount].push(lineSplit[0]);
    }   
  }); 
  return syllablesArr; 
}

//var syllablesArr = formatData(cmudictFile);

function createHaiku(structure, arr) {
	var haikuArr = [];
	for (var i = 0; i < structure.length; i++){
		var line = [];
		for (var j = 0; j < structure[i].length; j++) {
			var syllcount = structure[i][j];
			var randomIndex = Math.floor(Math.random()*arr[syllcount].length);
			line.push(arr[syllcount][randomIndex]);
		}
		haikuArr.push(line.join(' '))
	}
	return haikuArr.join('\n');
}

exports.createHaiku = createHaiku;
exports.formatData = formatData;
exports.readCmudictFile = readCmudictFile;


//console.log(createHaiku([[5],[7],[5]], syllablesArr));