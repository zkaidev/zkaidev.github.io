#!/usr/bin/env node

const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const marked = require('marked');
const helpers = require('./helpers');

const rootDir = path.resolve(__dirname, '..');
const subjectsDir = path.resolve(rootDir, 'subjects');
const templatesDir = path.resolve(rootDir, 'templates');
const indexTemplatePath = path.resolve(templatesDir, 'index.html');
const indexPath = path.resolve(rootDir, 'index.html');
const subjectManifestPath = path.resolve(subjectsDir, 'index.md');
const tmpindex = path.resolve(rootDir, 'tmpindex.html');

console.log('starting...');

console.log('init tmpindex.html from template');
if(fs.existsSync(tmpindex)) {
	fs.unlinkSync(tmpindex);
}
fs.copyFileSync(indexTemplatePath, tmpindex);

console.log('get lines from index.html and manifest');
var index_lines = helpers.get_lines(tmpindex);
var manifest_lines = helpers.get_lines(subjectManifestPath);

console.log('replace outline');
var tmp_lines = manifest_lines.map(l => {
	var text = l.substring(0,l.length-3); // remove '.md'
	return '<li>' + text + '</li>';
});
tmp_lines.unshift('<ul>');
tmp_lines.push('</ul>');
helpers.replace(index_lines, 'outline', tmp_lines);

console.log('replace subjects');
tmp_lines = [];
for(let subject of manifest_lines) {
	let file = path.resolve(subjectsDir, subject)
	let lines = helpers.get_lines(file);
	lines = lines.map(l => marked(l));
	let basename = path.basename(file);
	lines.unshift(`<div class="subject" id="${basename.slice(0, basename.length-3)}">`);
	lines.push('</div>');
	console.log(lines);
	tmp_lines.splice(tmp_lines.length, 0, ...lines);
}
helpers.replace(index_lines, 'subjects', tmp_lines);


console.log('write tmpindex.html file');
fs.writeFileSync(tmpindex, index_lines.join('\n'), {'flag': 'w'});

console.log('rename tmpindex.html to index.html');
if(fs.existsSync(indexPath)) {
	fs.unlinkSync(indexPath);
}
fs.renameSync(tmpindex, indexPath);

console.log('done!');
