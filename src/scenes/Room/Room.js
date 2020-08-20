import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import * as gameFunctions from "../../utils/Game/GameFunctions";
import firebase from 'firebase/app';
import 'firebase/firestore';

import config from './../../config';
import RollWord from '../../components/rollWord/rollWord';


function Room() {
  let { room } = useParams();
  const [roomId, setRoomId] = useState();
  const [roomData, setRoomData] = useState();
  const [users, setUsers] = useState();
  const [database, setDataBase] = useState()

  useEffect(() => {
    // Initialize Firebase    
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
      setDataBase(firebase.firestore())
    }
  }, []);

  useEffect(() => {
    setRoomId(room)
  }, []);

  useEffect(() => {
    if (database)
      getRoom()
  }, [database]);

  const getRoom = () => {
    const unsubscribe = database.collection('PhonoRooms').doc(roomId)
      .onSnapshot(function (room) {
        if (room) {
          console.log("Current data: ", room.data());
          setRoomData(room.data())
          setUsers(room.data().users)
        }
      })
    return () => {
      unsubscribe()
    }
  }

  return (
    <div className="room">
      <rollWord word={'pan'} />
    </div>
  );
}

export default Room;
