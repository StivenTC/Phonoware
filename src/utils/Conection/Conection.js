export function test(word) {
  console.log("work   ", word)
}

export async function verifyWordRae(showWord) {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://dle.rae.es/' + showWord);
  return await response.text();
}