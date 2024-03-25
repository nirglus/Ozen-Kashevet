import React, { useEffect, useRef, useState } from 'react'
import Pr from './pr'
import RandomUserChat from './randomUserChat'
import {io} from "socket.io-client"


export default function ChatOnline() {
  const user = {}
  const socket =useRef()

  const [onlineUsers, setOnlineUsers] = useState([]);

  //online
  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", users => {
      setOnlineUsers(users);
    })
  }
    , [user])
  console.log(onlineUsers);

  return (
    <>
      <div>
        <Pr />
      </div>
      <div>
        <RandomUserChat />
      </div>

    </>

  )
}
