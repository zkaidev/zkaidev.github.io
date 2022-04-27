#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const basedir = path.resolve(__dirname, '..');
const langdir = path.resolve(basedir, 'lang');
const index = path.resolve(basedir, 'src', 'index.html');
const index_tmp = path.resolve(basedir, 'dist', 'index_tmp.html');

let data = {};
let langs = fs.readdirSync(langdir);
langs.forEach(l => {
  let r = /\.md$/i;
  if(r.test(l)) {
    let name = l.slice(0, -3).replace(/^./, c => c.toUpperCase());
    let f = path.resolve(langdir, l);
    data[name] = fs.readFileSync(f).toString();
  }
});

let lines = readlines(index);
let fd = fs.openSync(index_tmp, 'w');

for(let l of lines) {
  fs.writeFileSync(fd, l);

  let rBody = /<body>/;
  if(rBody.test(l)) {
    let script = `
      <script>
        let data = ${JSON.stringify(data)};
      </script>
    `;
    fs.writeFileSync(fd, script);
  }
}

fs.closeSync(fd);

fs.copyFileSync(index_tmp, path.resolve(basedir, 'dist', 'index.html'));
fs.unlinkSync(index_tmp);



/*
 * helper functions
 */
function readlines(file) {
  return fs.readFileSync(file).toString().split('\n');
}

