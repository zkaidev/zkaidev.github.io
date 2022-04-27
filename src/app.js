const marked = require('marked');
const hljs = require('highlight.js');


let root = document.getElementById("root");
let html = "";
for(let v of Object.values(data)) {
  html += marked(v);
}
root.innerHTML = html;


document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('code').forEach((el) => {
    hljs.highlightElement(el);
  });
});

