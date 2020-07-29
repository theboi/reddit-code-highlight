import hljs from 'highlight.js';

const OPTIONS_AVAILABLE = ["light-style", "dark-style"]
const DEFAULT_STYLE = ["default", "dark"]
let isDarkMode = false;

setTimeout(() => {
  for (const element of document.querySelectorAll("pre code")) {
    hljs.highlightBlock(element)
  }
  const mainDiv = document.querySelector('body div div')
  const color = window.getComputedStyle(mainDiv).getPropertyValue('--background')
  isDarkMode = isDark(color)

  const style = window.sessionStorage.getItem(OPTIONS_AVAILABLE[isDarkMode ? 1 : 0]) || DEFAULT_STYLE[isDarkMode ? 1 : 0];
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', `${window.sessionStorage.getItem('extUrl')}/${style}.css`)
  document.head.appendChild(link)
}, 2000)

const isDark = (color) => {
  // Yeeted off the internet from https://awik.io/determine-color-bright-dark-using-javascript/
  let r, g, b, hsp;
  const threshold = 127.5

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(
      color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > threshold) return false;
  else return true;
}
