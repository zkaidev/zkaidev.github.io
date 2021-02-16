
const fs = require('fs');
const readline = require('readline');

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

module.exports = {
    'read_lines': read_lines
};