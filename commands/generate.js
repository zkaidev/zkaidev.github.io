#!/usr/bin/env node

const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const helpers = require('./helpers');

const subjectsDir = path.resolve(__dirname, '../subjects');
const templatesDir = path.resolve(__dirname, '../templates');
const indexTemplatePath = path.resolve(templatesDir, 'index.html');
const outIndexPath = path.resolve(__dirname, '../index.html');
const subjectManifestPath = path.resolve(subjectsDir, 'index.md');


helpers.read_lines(indexTemplatePath, (lines) => {
    console.log('deleting index.html');
    fs.unlinkSync(outIndexPath);

    console.log('append head of index.html');
    for(var i=0; i<lines.length; i++) {
        fs.appendFileSync(outIndexPath, lines[i]+'\n', {'flag': 'a+'});
        if(lines[i].trim() == "<body>") {
            break;
        }
    }

    console.log('read subjects file.');
    let promise = new Promise((resolve, reject) => {
        helpers.read_lines(subjectManifestPath, (subjects) => {
            for(var i=0; i<subjects.length; i++) {
                try {
                let text = fs.readFileSync(path.resolve(subjectsDir, subjects[i]));
                fs.appendFileSync(outIndexPath, text.toString()+'\n', {'flag': 'a+'});
                } catch {
                    console.log(`${subjects[i]} is not existing.`);
                }
            }
            resolve();
        });
    });
    

    promise.then(() => {
        console.log('append trail of index.html');
        for(; i<lines.length; i++) {
            fs.appendFileSync(outIndexPath, lines[i]+'\n', {'flag': 'a+'});
        }
    });
    
    
});

/*
fs.readFile('/Users/joe/test.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
  })
  */