// Wait for Reddit to finish loading before changing styles
setTimeout(() => {
  for (element of document.querySelectorAll("pre > code")) {
    let theme = window.getComputedStyle(element).getPropertyValue('--background')
    console.log(theme)
    const content = element.innerHTML;
    element.innerHTML = highlightCode(content)
  }
}, 2000)

const highlightCode = (string) => {
  generalFeatures.forEach((value, key) => {
    console.log(key)
    string = string.replace(RegExp(`${key}`, 'gm'), (match) => `<spanrchext${value}">${match}</span>`)
  })
  generalKeywords.forEach((value, key) => {
    console.log(key)
    string = string.replace(RegExp(`\\b${key}\\b`, 'gm'), (match) => `<spanrchext${value}">${match}</span>`)
  })
  string = string.replace(/<spanrchext/g, (match) => `<span class="rch-ext-${match.slice(11)}`)
  return string
  // return string.split(/ /).map((string) => {
  //   if (generalFeatures.has(string)) {
  //     return `<span class="rch-ext-${generalFeatures.get(string)}">${string}</span>`
  //   }
  //   return string
  // }).join(" ")
}

const generalKeywords = new Map([
  ["var", "vak"], // va(k): Variable (keyword)
  ["let", "vak"],

  ["const", "cok"], // co(k): Constant (keyword)

  ["class", "clk"], // cl(k): Class (keyword)

  ["function", "fuk"], // fu(k): Function (keyword)
  ["func", "fuk"],

  ["number", "ty"], // ty: Type
  ["string", "ty"],
  ["int", "ty"],
  ["bool", "ty"],
  ["boolean", "ty"],

  ["#include", "ie"], // ie: Import, Export
  ["import", "ie"],
  ["export", "ie"],
])

const generalFeatures = new Map([
  ["[\\w]+[\\s]*(?=\\(.*\\))", "me"],

  ["\\/\\/.{0,}", "cm"], // cm: Comment
  ["#.{0,}", "cm"],

  ['".*"', "st"],
  ['`.*`', "st"],
  ["'.*'", "st"],


])


//TODO: Go thru each word in string, check Hashmap if word is keyword, if yes, highlight according to color