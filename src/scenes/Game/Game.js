import React, { useState, useEffect } from 'react';
import * as gameFunctions from "../../utils/Game/GameFunctions";
import * as conections from "../../utils/Conection/Conection";
import * as constants from "../../utils/Game/Constants";

function Game() {

  const [initWord, setInitWord] = useState(""); //Palabra inicial
  const [showWord, setShowWord] = useState(''); //Palabra mostrada para render
  const [currentWord, setCurrentWord] = useState(''); //palabra cambiando
  const [nWord, setnWord] = useState(''); //palabra cambiando
  const [listWords, setListWords] = useState([]) //Listado palabras completadas  

  const [lifes, setLifes] = useState(3);

  const [isLoading, setLoading] = useState(false);
  const [userMsg, setUserMsg] = useState({ msg: '', type: 'error' });

  const [lastWordPosition, setLastWordPosition] = useState(-1);

  const abc = constants.abc
  const words = constants.words

  useEffect(() => {
    //restartGame()
  }, []);

  const changeLetter = (direction, positionWord, positionLetter) => {
    let countLetter = positionLetter
    let newWord = currentWord
    let lastWord = listWords[listWords.length - 1]
    let originalLetter = lastWord.split('')[lastWordPosition]


    //reset the word when the users changes the letter
    if (lastWordPosition !== positionWord) {
      newWord[lastWordPosition] = originalLetter
      setLastWordPosition(positionWord)
    }

    if (direction === 'top') {
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

  const restartGame = (word) => {
    let max = words.length
    let min = 0
    let rn = Math.floor(Math.random() * (max - min)) + min
    //let newWord = words[rn]
    let newWord = word
    setInitWord(newWord)
    setCurrentWord(newWord.split(''))
    setShowWord(newWord)
    setListWords([newWord])
    setLifes(3)
  }

  const newWord = (e) => {
    setnWord(e.target.value)
  }

  const verifyWordEnglish = () => {
    console.log(showWord)
    let word = conections.verifyWordEnglish(showWord)
    return word
  }

  async function checkWordEnglish() {
    setLoading(true)
    let arrayWords = listWords

    if (!listWords.includes(showWord)) {

      let response = await verifyWordEnglish()
      response = response.substring(response.search('<title>'), response.search('</title>'))
      console.log(response, '...')

      if (!response.includes('Did you spell it correctly?')) {
        arrayWords.push(showWord)
        setListWords(arrayWords)
        //setInitWord(showWord)
        if (Number.isInteger((listWords.length - 1) / 40)) {
          showUserMsg('¡Correct! Take a new life', 'correct')
          setLifes(lifes + 1)
        } else {
          showUserMsg('¡It is correct!', 'correct')
        }
      } else {
        if (lifes > 0) {
          showUserMsg('Nope, -1 heart ', 'error')
          setLifes(lifes - 1)
        }
        setInitWord(listWords[listWords.length - 1])
      }
    } else {
      showUserMsg('Ups, repeated', 'error')

      if (lifes !== 1) {
        setLifes(lifes - 1)
      }
    }
    setLoading(false)
  }

  const verifyWordRae = () => {
    console.log(showWord)
    let word = conections.verifyWordRae(showWord)
    return word
  }
  async function checkWordRae() {
    setLoading(true)
    let arrayWords = listWords

    if (!listWords.includes(showWord)) {

      let response = await verifyWordRae()
      response = response.substring(response.search('<title>'), response.search('</title>'))

      if (!response.includes('| Edición del Tricentenario |')) {
        arrayWords.push(showWord)
        setListWords(arrayWords)
        //setInitWord(showWord)
        if (Number.isInteger((listWords.length - 1) / 40)) {
          showUserMsg('¡Correcto! Toma otra vida', 'correct')
          setLifes(lifes + 1)
        } else {
          showUserMsg('¡Correcto!', 'correct')
        }
      } else {
        if (lifes > 0) {
          showUserMsg('Nope, -1 vida ', 'error')
          setLifes(lifes - 1)
        }
        setInitWord(listWords[listWords.length - 1])
      }
    } else {
      showUserMsg('Ups, repetida', 'error')

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
    <div className="game">
      <div className="header">
        <h1>PhonoWare</h1>
        <div className="lifes">{
          [...Array(lifes)].map((item, i) =>
            <span key={i}>❤️</span>
          )}
        </div>
        <div className="count-words">{listWords.length - 1}</div>
        <div className="current-word">{showWord}</div>
        <div className={`user-msg user-msg-${userMsg.type}`}>{userMsg.msg}</div>
      </div>
      {lifes === 0 ?
        <div className="lose-page">
          <p>¡Perdiste!</p>
          {/* <img src={require('../../assets/fail.jpeg')} alt="fail" /> */}
          <br />
          <button type="button" onClick={() => { setShowWord(''); setLifes(1) }}>Again</button>
        </div> :
        showWord === '' ?
          <div className="modal">
            <div className="modal-content">
              <h2>Escoge tu palabra inicial</h2>
              <div>
                {words.map((item, j) =>
                  <button key={j} onClick={() => restartGame(item)} >{item}</button>
                )}
              </div>
              <div>
                <form className="new-word-form">
                  <input type="text" name="nword" maxLength={7} onChange={(e) => newWord(e)} placeholder="Palabra propia" />
                  <input type="submit" value="Nueva" onClick={() => restartGame(nWord)} />
                </form>
              </div>
            </div>
          </div>
          : <div className="content">
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
                  <button type="button" disabled={showWord === listWords[listWords.length - 1] || isLoading} onClick={checkWordRae}>Verificar</button>
                }
              </div>
            </div>
            <div className="list-word">
              <h3>{listWords[listWords.length - 1]}</h3>
              <div className="list-word-list">
                {listWords.map((item, i) =>
                  <p key={i}>{item}</p>
                )}
              </div>
            </div>
          </div>
      }
    </div >
  );
}

export default Game;
