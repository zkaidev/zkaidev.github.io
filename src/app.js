const marked = require('marked');
const hljs = require('highlight.js');
const Lang = require('./lang.js');

let root = document.getElementById("root");
let langs = document.getElementById("langs");
let content = document.getElementById("content");


// create langs elements
let lang_objs = [];
for(let entry of Object.entries(data)) {
  let lang = new Lang();
  let key = entry[0];
  let value = marked(entry[1]);
  let r = /(?<=<code>)(.|\n)*?(?=<\/code>)/ig;
  value = value.replace(r, (m) => {
	  let a = m.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
	  return hljs.highlightAuto(a).value;
  });
  lang.name = key;
  lang.content = value;
  lang_objs.push(lang);
}

for(let l of lang_objs) {
  l.parent = content;
}


for(let l of lang_objs) {
  let div = document.createElement("div");
  let cb = document.createElement("input");
  cb.setAttribute('type', 'checkbox');
  cb.setAttribute('id', l.name);
  let lb = document.createElement("label");
  lb.setAttribute('for', l.name);
  let tn = document.createTextNode(l.name);
  lb.appendChild(tn);
  div.appendChild(cb);
  div.appendChild(lb);
  langs.appendChild(div);

  cb.addEventListener('click', (e) => {
		if(e.target.checked) {
		  get_lang(e.target.id).show();
		} else {
		  get_lang(e.target.id).hide();
		}
	});
}

langs.children[0].children[0].click();
langs.children[1].children[0].click();
langs.children[2].children[0].click();
langs.children[3].children[0].click();
langs.children[4].children[0].click();

// add class name
langs.classList.add("langs");
content.classList.add("content");


/*
 * helper functions
 */
function get_lang(name) {
  for(let l of lang_objs) {
		if(l.name === name) {
		  return l;
		}
	}
}
