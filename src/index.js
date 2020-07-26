import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

setTimeout(() => {
  for (const element of document.querySelectorAll("pre > code")) {
    // let theme = window.getComputedStyle(element).getPropertyValue('--background')
    // console.log(theme)
    // const content = element.innerText;
    // element.innerHTML = highlightCode(content)
    element.innerHTML = hljs.highlightAuto(element.innerHTML).value
  }
}, 2000)