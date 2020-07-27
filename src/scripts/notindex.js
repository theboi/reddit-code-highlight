'use strict';

import hljs from '/node_modules/highlight.js/lib/core.js';

// Wait for Reddit to finish loading before changing styles
setTimeout(() => {
  for (element of document.querySelectorAll("pre > code")) {
    // let theme = window.getComputedStyle(element).getPropertyValue('--background')
    // console.log(theme)
    // const content = element.innerText;
    // element.innerHTML = highlightCode(content)
    console.log(hljs)
    element.innerHTML = hljs.highlightAuto(element.innerHTML)
  }
}, 2000)

let keywords = new Map()

const highlightCode = (string) => {
  generalKeywords.forEach((value, key) => {
    const regex = RegExp(`${key}`, 'gm')
    const match = regex.exec(string)
    console.log("match", match);
    // if (!keywords.has(match.index)) {
    //   keywords.set(match.index, value)
    // }
  })
  console.log(keywords)
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

/*
generalFeatures.forEach((value, key) => {
    console.log(key)
    string = string.replace(RegExp(`${key}`, 'gm'), (match) => `<spanrchext${value}">${match}</span>`)
  })
  generalKeywords.forEach((value, key) => {
    console.log(key)
    string = string.replace(RegExp(`\\b${key}\\b`, 'gm'), (match) => `<spanrchext${value}">${match}</span>`)
  })
  string = string.replace(/(<spanrchext).{2,3}/g, (match) => `<span class="rch-ext-${match.slice(11)}`)
  return string
*/
