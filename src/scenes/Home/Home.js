import React, { useState } from 'react';
function Home() {
  const [word, setWord] = useState('rosas');
  const [showWord, setShowWord] = useState(word);
  const [currentWord, setCurrentWord] = useState(word.split(''));

  const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

  const changeLetter = (direction, positionWord, positionLetter) => {
    let countLetter = positionLetter
    let newWord = currentWord
    console.log(direction, positionWord, positionLetter)
    console.log(newWord)
    console.log('====================00')

    if (direction !== 'top') {
      console.log('resta')
      countLetter--
      if (countLetter < 0)
        countLetter = abc.length - 1
    } else {
      console.log('suma')
      countLetter++
      if (countLetter > abc.length - 1)
        countLetter = 0
    }

    console.log(countLetter, 'cuent')
    newWord[positionWord] = abc[countLetter]
    console.log(newWord)
    setCurrentWord(newWord)
    setShowWord(currentWord.join(''))
  }

  const reset = () => {
    setCurrentWord(word.split(''))
    setShowWord(word)
  }

  return (
    <div className="home">
      <div className="header">PhoneWare</div>
      <div className="header">{showWord}</div>
      <button type="button" onClick={reset}>Reiniciar</button>
      <div className="content">
        <div className="roll-word">
          {[...Array(word.length)].map((e, i) =>
            <div className="roll-letter" key={i}>
              {
                abc.map((item, j) =>
                  currentWord[i] === item &&
                  <div key={j}>
                    <button type="button" className="arrow arrow-top" onClick={() => changeLetter('top', i, j)}>▲</button>
                    <button type="button" className="arrow arrow-bottom" onClick={() => changeLetter('bottom', i, j)}>▼</button>
                    <span>{item}</span>
                  </div>
                )}
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
