'use strict';

const OPTIONS_AVAILABLE = ["light-style", "dark-style"]
const OPTIONS_CLASS_NAME = "options"

const restoreOptions = () => {
  try {
    chrome.storage.sync.get(OPTIONS_AVAILABLE, (result) => {
      for (const option in result) {
        document.getElementById(option).value = result[option]
      }
    })
  } catch (e) {
    console.error("ERROR: ", e)
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
for (const element of document.getElementsByClassName(OPTIONS_CLASS_NAME)) {
  element.addEventListener('input', (e) => {

    try {
      const value = e.target.value;
      const target = e.target.id;
      chrome.storage.sync.set({
        [target]: value
      }, () => console.log(`Option "${target}" successfully set to "${value || e.target.placeholder}"`))
    } catch (e) {
      console.error("ERROR: ", e)
    }

  });
}

document.addEventListener("keydown", (e) => {
  if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.code == "KeyS") {
    e.preventDefault();
    document.querySelector(".saved").textContent = "Saved automatically! 🎉"
  }
}, false);