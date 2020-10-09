'use strict';

const OPTIONS_AVAILABLE = ["light-style", "dark-style"]

/** Insert HTML script tag containing index.js into Reddit website */
const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL('./dist/main.js'));
const head = document.head || document.documentElement;
head.insertBefore(script, head.lastChild);

/** Attempt to retrieve user settings of style selected for themes */
try {
  chrome.storage.sync.get(OPTIONS_AVAILABLE, (result) => {
    for (const option in result) {
      window.sessionStorage.setItem(option, result[option])
    }
  })
  window.sessionStorage.setItem('extUrl', chrome.extension.getURL('/node_modules/highlight.js/styles'))
} catch (e) {
  console.error("ERROR: ", e)
}