import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import config from './../../config';

function Home() {

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

  return (
    <div className="home">
      <div className="home-header">
        <h1>PhonoWare</h1>
        <p>Phonological Awareness</p>
      </div>
      <div className="home-inputs">

        <div className="rooms-content">
          <div className="rooms-open">
            {rooms?.map((item, i) =>
              <div key={i}>
                {item.name}<br />
                {item.users.length}<br />
                {item.initWord}
              </div>
            )}
          </div>
          <div className="rooms-open">
            <button type="button" onClick={getRooms}>Crear nueva sala</button>

          </div>

        </div>
        <button type="button" onClick={getRooms}>Solitario</button>
        <div className="modal modal-mode">

        </div>


      </div>

    </div>
  );
}

export default Home;
