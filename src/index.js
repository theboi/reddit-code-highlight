import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
const OPTIONS_AVAILABLE = ["light-style", "dark-style"]
let isDarkMode = false;

setTimeout(() => {
  for (const element of document.querySelectorAll("pre code")) {
    hljs.highlightBlock(element)
  }
  window.html
  OPTIONS_AVAILABLE.forEach((option) => { })
}, 2000)

// console.log(window.sessionStorage.getItem(option))