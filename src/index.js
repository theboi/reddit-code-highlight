import hljs from 'highlight.js';

const OPTIONS_AVAILABLE = ["light-style", "dark-style"]
const DEFAULT_STYLE = ["default", "dark"]
let isDarkMode = false;

setTimeout(() => {
  for (const element of document.querySelectorAll("pre code")) {
    hljs.highlightBlock(element)
  }
  const style = window.sessionStorage.getItem(OPTIONS_AVAILABLE[isDarkMode ? 1 : 0]) || DEFAULT_STYLE[isDarkMode ? 1 : 0];
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', `${window.sessionStorage.getItem('extUrl')}/${style}.css`)
  document.head.appendChild(link)
}, 2000)