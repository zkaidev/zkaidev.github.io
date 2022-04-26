const marked = require('marked');


let root = document.getElementById("root");
let html = "";
for(let v of Object.values(data)) {
  html += marked(v);
}
root.innerHTML = html;
