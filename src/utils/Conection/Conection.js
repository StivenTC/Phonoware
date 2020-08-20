var Typo = require("typo-js");
var dictionary = new Typo("en_US", false, false, { dictionaryPath: "typo/dictionaries" });


export function test(word) {
  console.log("work   ", word)
}

export async function verifyWordRae(showWord) {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://dle.rae.es/' + showWord);
  return await response.text();
}

export async function verifyWordEnglish(showWord) {
  let response = ''

  try {
    response = await fetch('https://cors-anywhere.herokuapp.com/https://www.oxfordlearnersdictionaries.com/us/definition/american_english/' + showWord);
    response = await fetch('https://cors-anywhere.herokuapp.com/https://www.oxfordlearnersdictionaries.com/us/definition/english/' + showWord);
  } catch (error) {
    console.log('jajaj', response)
    response = "eerer"

  } finally {
    return response.text();
  }
}