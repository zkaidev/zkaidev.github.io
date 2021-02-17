
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


/*
function substitute_placeholder(file, tag, html) {
	read_lines(file, (lines) => {
		var tmp_lines = [];
		for(var i=0; i<lines.length; i++) {
			if(lines[i].trim() == "<!-- " + tag + " -->") { break; }
			tmp_lines.push(lines[i]);
		}

		tmp_lines.push(html);

		for(i+=1; i<lines.length; i++) {
			tmp_lines.push(lines[i]);
		}
		fs.writeFileSync(file, tmp_lines.join('\n'), {'flag': 'w'});
	});
}

function read_lines(file, callback) {
    let promise = new Promise(function (resolve, reject) {
        var rs = fs.createReadStream(file);
        var rl = readline.createInterface({ input: rs });
        var lines = [];
        rl.on('line',function (line) {
            lines.push(line);
        });

        rl.on('close', function () {
            resolve(lines);
        });
    });

    promise.then(function (lines) {
        callback(lines);
    });
}
*/

module.exports = {
    'get_lines': get_lines,
	'replace': replace
};
