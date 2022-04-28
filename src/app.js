const marked = require('marked');
const hljs = require('highlight.js');
const Lang = require('./lang.js');


let langs = [];
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
  langs.push(lang);
}


let root = document.getElementById("root");
let side = document.createElement("div");
let content = document.createElement("div");

for(let l of langs) {
  l.parent = content;
}

side.classList.add("side");
for(let l of langs) {
  let cb = document.createElement("input");
  cb.setAttribute('type', 'checkbox');
  cb.setAttribute('id', l.name);
  let lb = document.createElement("label");
  lb.setAttribute('for', l.name);
  let tn = document.createTextNode(l.name);
  lb.appendChild(tn);
  side.appendChild(cb);
  side.appendChild(lb);

  cb.addEventListener('click', (e) => {
		if(e.target.checked) {
		  get_lang(e.target.id).show();
		} else {
		  get_lang(e.target.id).hide();
		}
	});
}
root.appendChild(side);
side.children[0].click();


content.classList.add("content");
root.appendChild(content);


/*
 * helper functions
 */
function get_lang(name) {
  for(let l of langs) {
		if(l.name === name) {
		  return l;
		}
	}
}
