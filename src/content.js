'use strict';

const OPTIONS_AVAILABLE = ["light-style", "dark-style"]

const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL('./dist/main.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);

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