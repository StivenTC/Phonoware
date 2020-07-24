import React, { useState, useEffect } from 'react';
function Home() {

  const [initWord, setInitWord] = useState(""); //palabra inicial
  const [showWord, setShowWord] = useState(initWord); //palabra mostrada para render
  const [currentWord, setCurrentWord] = useState(initWord.split('')); //palabra cambiando
  const [listWords, setListWords] = useState([]) //LIStado palabras completadas  

  const [lifes, setLifes] = useState(3);

  const [isLoading, setLoading] = useState(false);
  const [userMsg, setUserMsg] = useState({ msg: '', type: 'error' });

  const [lastWordPosition, setLastWordPosition] = useState(-1);

  const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  const words = ["rosas", "casa", "libro", "pelota", "notario", "color", "rosca"]

  useEffect(() => {
    restartGame()
  }, [initWord]);

  const changeLetter = (direction, positionWord, positionLetter) => {
    let countLetter = positionLetter
    let newWord = currentWord
    let originalLetter = initWord.split('')[lastWordPosition]

    if (lastWordPosition !== positionWord) {
      newWord[lastWordPosition] = originalLetter
      setLastWordPosition(positionWord)
    }

    if (direction !== 'top') {
      countLetter--
      if (countLetter < 0)
        countLetter = abc.length - 1
    } else {
      countLetter++
      if (countLetter > abc.length - 1)
        countLetter = 0
    }

    setLastWordPosition(positionWord)
    newWord[positionWord] = abc[countLetter]
    setCurrentWord(newWord)
    setShowWord(currentWord.join(''))
  }

  const resetWord = () => {
    setCurrentWord(initWord.split(''))
    setShowWord(initWord)
  }

  const restartGame = () => {
    let max = words.length
    let min = 0
    let rn = Math.floor(Math.random() * (max - min)) + min
    let newWord = words[rn]
    setInitWord(newWord)
    setCurrentWord(initWord.split(''))
    setShowWord(initWord)
    setListWords([initWord])
    setLifes(3)
  }


  async function verifyWordRae() {
    console.log(showWord)
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://dle.rae.es/' + showWord);
    return await response.text();
  }

  async function checkWord() {
    setLoading(true)
    let arrayWords = listWords

    if (!listWords.includes(showWord)) {

      let response = await verifyWordRae()
      response = response.substring(response.search('<title>'), response.search('</title>'))

      if (!response.includes('| Edición del Tricentenario |')) {
        showUserMsg('¡Correcto!', 'correct')
        arrayWords.push(showWord)
        setListWords(arrayWords)
        setInitWord(showWord)
        if (Number.isInteger((listWords.length - 1) / 40)) {
          setLifes(lifes + 1)
        }
      } else {
        if (lifes > 0) {
          showUserMsg('Nope, -1 vida ', 'error')
          setLifes(lifes - 1)
        }
        setInitWord(initWord)
      }
    } else {
      showUserMsg('Repetida', 'error')
      resetWord()
      if (lifes !== 1) {
        setLifes(lifes - 1)
      }
    }
    setLoading(false)
  }

  const showUserMsg = (msg, type) => {
    setUserMsg({ msg: msg, type: type })
    setTimeout(function () { setUserMsg({ msg: '', type: '' }); }, 2000);
  }

  return (
    <div className="home">
      <div className="header">
        <h1>PhoneWare</h1>
        <div className="lifes">{
          [...Array(lifes)].map((item, i) =>
            <span key={i}>♥</span>
          )}
        </div>
        <div className="count-words">{listWords.length - 1}</div>
        <div className="current-word">{showWord}</div>
        <div className={`user-msg user-msg-${userMsg.type}`}>{userMsg.msg}</div>
      </div>
      {lifes === 0 ?
        <div className="lose-page">
          <p>Perdiste</p>
          {/* <img src={require('../../assets/fail.jpeg')} alt="fail" /> */}
          <br />
          <button type="button" onClick={restartGame}>Otra vez</button>
        </div> :

        <div className="content">
          <div className="roll-word">
            {[...Array(initWord.length)].map((e, i) =>
              <div className="roll-letter" key={i}>
                {
                  abc.map((item, j) =>
                    currentWord[i] === item &&
                    <div key={j}>
                      <button type="button" disabled={isLoading} className="arrow arrow-top" onClick={() => changeLetter('top', i, j)}>▲</button>
                      <button type="button" disabled={isLoading} className="arrow arrow-bottom" onClick={() => changeLetter('bottom', i, j)}>▼</button>
                      <span>{item}</span>
                    </div>
                  )}
              </div>

            )}
          </div>
          <div className="check-content">
            <div className="check-word">
              {isLoading ?
                <p>Verificando...</p> :
                <button type="button" disabled={showWord === initWord || isLoading} onClick={checkWord}>Verificar</button>
              }
            </div>
          </div>
          <div className="list-word">
            {listWords.map((item, i) =>
              <p key={i}>{item}</p>
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
