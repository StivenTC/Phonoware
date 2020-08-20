import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import * as gameFunctions from "../../utils/Game/GameFunctions";
import * as constants from "../../utils/Game/Constants";
import * as conections from "../../utils/Conection/Conection";
import firebase from 'firebase/app';
import 'firebase/firestore';

import config from './../../config';


function RollWord({ word }) {

  const [initWord, setInitWord] = useState(""); //Palabra inicial
  const [showWord, setShowWord] = useState(''); //Palabra mostrada para render
  const [currentWord, setCurrentWord] = useState(''); //palabra cambiando
  const [listWords, setListWords] = useState([]) //Listado palabras completadas  

  const [lifes, setLifes] = useState(3);

  const [isLoading, setLoading] = useState(false);
  const [userMsg, setUserMsg] = useState({ msg: '', type: 'error' });

  const [lastWordPosition, setLastWordPosition] = useState(-1);

  const abc = constants.abc
  const words = constants.words

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

  const restartGame = () => {
    console.log('jajaj')
    let max = words.length
    let min = 0
    let rn = Math.floor(Math.random() * (max - min)) + min
    let newWord = words[rn]
    setInitWord(newWord)
    setCurrentWord(newWord.split(''))
    setShowWord(newWord)
    setListWords([newWord])
    setLifes(3)
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
    <div className="room">
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

    </div>
  );
}

export default RollWord;
