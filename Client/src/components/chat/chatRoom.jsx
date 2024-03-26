import React from 'react'
import logo from '../../assets/img/Anonimos.png'
import "./messages.css"
import {format} from "timeago.js"

export default function ChatRoom({messages , own}) {
  return (
    <div className={own? "messege own" : "messege"}>
      <div className="messegeTop">
        <img src={logo} alt="" className="messegeImg"/>
        <p className="messegeText">
          {messages?.message_content}
        </p>
        </div>
      <div className="messegeButtom">{format(messages?.createdAt)}</div>
    </div>
  )
}