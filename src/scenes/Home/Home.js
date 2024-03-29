import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/firestore';

import config from './../../config';

function Home() {

  const history = useHistory();
  const [rooms, setRooms] = useState()
  const [database, setDataBase] = useState()
  const [userName, setUserName] = useState()

  useEffect(() => {
    // Initialize Firebase    
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
      setDataBase(firebase.firestore())
    }
  }, []);

  useEffect(() => {
    if (database)
      getRooms()
  }, [database]);

  const getRooms = () => {
    const unsubscribe = database.collection('PhonoRooms')
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          // we have something
          let roomsArray = []
          snapshot.forEach(doc => {
            roomsArray.push({ ...doc.data(), id: doc.id })
          }
          )
          setRooms(roomsArray)
          console.log(rooms)
        } else {
          // it's empty
        }
      })
    return () => {
      unsubscribe()
    }
  }

  const goSinglePlayer = () => {
    history.push("/game")
  }

  const goRoom = (roomId) => {
    history.push("/room=" + roomId)
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1>PhonoWare</h1>
        <p>Phonological Awareness</p>
        {/* <small>Designed by Cristian Blanco <br />
        Developed by Stiven Tovar
        </small> */}
      </div>
      <div className="home-inputs">
        <div className="single-player">
          {/* <button type="button" onClick={goSinglePlayer}>Jugar solo</button> */}
          <button type="button" onClick={goSinglePlayer}>Jugar</button>
        </div>

        {/* <div className="rooms-content">
          <div className="rooms-open">
            {rooms?.map((item, i) =>
              <button type="button" onClick={() => goRoom(item.id)} key={i}>
                <h3>{item.name}</h3>
                <p>{item.initWord}</p>
                <p>{item.users.length}</p>
              </button>
            )}
          </div>
          <div className="rooms-new">
            <button className="rooms-new-btn" type="button" onClick={getRooms}>Crear nueva sala</button>
          </div>
        </div>
      */}
      </div>

    </div>
  );
}

export default Home;
