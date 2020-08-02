import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import * as gameFunctions from "../../utils/Game/GameFunctions";

function Room() {
  let { room } = useParams();
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    setRoomId(room)
    console.log(roomId, "room")
  }, []);

  return (
    <div className="room">
      <h1>hola {roomId}</h1>
      <button onClick={() => gameFunctions.test("lala")}>jajajaja</button>
    </div>
  );
}

export default Room;
