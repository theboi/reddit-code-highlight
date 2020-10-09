import hljs from 'highlight.js';

/**
 * Generic callback with no parameters no returns
 * @callback genericCallback
 * @returns {void}
 */

const OPTIONS_AVAILABLE = ["light-style", "dark-style"]
const DEFAULT_STYLE = ["default", "dark"]
let isDarkMode = false;

/**
 * Highlights code throughout the document after 2 seconds (to allow Reddit page to load)
 * @param {genericCallback} callback Called after highlighting code
 */
const highlightBlocks = (callback) => {
  setTimeout(() => {
    /** Highlight all code blocks on page */
    for (const element of document.querySelectorAll("pre code")) {
      hljs.highlightBlock(element)
    }

    /** Callback if present */
    callback?.()
  }, 2000);
}

/** Attempt to highlight code blocks again on page change via link */
var pushState = history.pushState;
history.pushState = function () {
  pushState.apply(history, arguments);
  highlightBlocks()
};

/** Attempt to highlight code blocks again on page change via back/forward */
window.addEventListener('popstate', highlightBlocks);

/** 2 seconds after page begins loading */
highlightBlocks(() => {
  /** Checks for dark/light theme */
  const mainDiv = document.querySelector('body div div')
  const color = window.getComputedStyle(mainDiv).getPropertyValue('--background')
  isDarkMode = isDark(color)

  /** Fetches and uses style based on theme via Chrome options */
  const style = window.sessionStorage.getItem(OPTIONS_AVAILABLE[isDarkMode ? 1 : 0]) || DEFAULT_STYLE[isDarkMode ? 1 : 0];
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', `${window.sessionStorage.getItem('extUrl')}/${style}.css`)
  document.head.appendChild(link)
})

/**
 * Checks whether a given color is dark.
 * Uses HSP equation from http://alienryderflex.com/hsp.html
 * PDF copy found in root of repository.
 * @param {string} color HEX/RGB color code of color to check.
 * @returns {bool} Boolean stating whether color is dark.
 */
const isDark = (color) => {
  let r, g, b, hsp
  const threshold = 127.5

  /** Check format of color (HEX/RGB) */
  if (color.match(/^rgb/)) {
    /** If RGB: Store R, G, B values in separate variables */
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    /** If HEX: Convert it to RGB: http://gist.github.com/983661 */
    color = +("0x" + color.slice(1).replace(
      color.length < 5 && /./g, '$&$&'))

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  /** HSP equation from http://alienryderflex.com/hsp.html */
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  /** Using the HSP value, determine whether the color is light or dark */
  if (hsp > threshold) return false;
  else return true;
}
