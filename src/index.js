import hljs from 'highlight.js';

const OPTIONS_AVAILABLE = ["light-style", "dark-style"]
const DEFAULT_STYLE = ["default", "dark"]
let isDarkMode = false;

// import(`highlight.js/styles/default.css`);

setTimeout(() => {
  for (const element of document.querySelectorAll("pre code")) {
    hljs.highlightBlock(element)
  }
  const style = window.sessionStorage.getItem(OPTIONS_AVAILABLE[isDarkMode ? 1 : 0]);
  await import(`highlight.js/styles/${style ?? DEFAULT_STYLE[isDarkMode ? 1 : 0]}.css`);
}, 2000)