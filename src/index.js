// Wait for Reddit to finish loading before changing styles
setTimeout(() => {
  for (element of document.querySelectorAll("pre > code")) {
    let theme = window.getComputedStyle(element).getPropertyValue('--background')
    console.log(theme)
    const content = element.innerHTML;
    element.innerHTML = `<span class="rch-ext-method">${content}</span>`
  }
}, 2000)

const highlightCode = (string, lang) => {
  string.split(/\s/).map().join(" ")
}

const features = {
  javascript: new Map(Object.entries({
    var: "#fff",
    let: "#fff",
    const: "",
    class: "",
  }))
}

//TODO: Go thru each word in string, check Hashmap if word is keyword, if yes, highlight according to color