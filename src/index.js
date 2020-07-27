import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

setTimeout(() => {
  for (const element of document.querySelectorAll("pre > code")) {
    element.innerHTML = hljs.highlightAuto(element.innerHTML).value
  }
}, 2000)