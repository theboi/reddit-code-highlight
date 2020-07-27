'use strict';

const OPTIONS_AVAILABLE = ["light-style", "dark-style"]
const OPTIONS_CLASS_NAME = "options"

const onOptionChange = (event) => {
  try {
    const value = event.target.value;
    const target = event.target.id;
    chrome.storage.sync.set({
      [target]: value
    }, () => console.log(`Option "${target}" successfully set to "${value || event.target.placeholder}"`))
  } catch (e) {
    console.error("ERROR: ", e)
  }
}

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
  element.addEventListener('input', (event) => onOptionChange(event));
}