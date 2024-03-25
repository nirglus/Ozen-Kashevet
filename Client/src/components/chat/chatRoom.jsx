import React from 'react'
import logo from '../../assets/img/Anonimos.png'
import "./messages.css"

export default function ChatRoom({messages , own}) {
  return (
    <div className={own? "messege own" : "messege"}>
      <div className="messegeTop">
        <img src={logo} alt="" className="messegeImg"/>
        <p className="messegeText">
          {messages?.message_content}
        </p>
        </div>
      <div className="messegeButtom">{messages?.createdAt}</div>
    </div>
  )
}