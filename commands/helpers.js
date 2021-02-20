
const fs = require('fs');
const readline = require('readline');

// return an array of lines
function get_lines(file) {
	var data = fs.readFileSync(file);
	var lines = data.toString().split('\n');
	return lines;
}


// replace placeholder
function replace(lines, tag, new_lines) {
	for(var i=0; i<lines.length; i++) {
		if(lines[i].trim() == "<!-- " + tag + " -->") { break }
	}
	if(i < lines.length) {
		lines.splice(i, 1, ...new_lines);
	}
}

module.exports = {
	'get_lines': get_lines,
	'replace': replace
};

