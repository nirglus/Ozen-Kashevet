import React from 'react'
import messages from '../../pages/messages'
import "./messages.css"

export default function Messege({messages , own}) {
  return (
    <div className={own? "messege own" : "messege"}>
      <div className="messegeTop">
        <img src='Ozen-Kashevet/Client/src/assets/img/Anonimos.png' alt="" className="messegeImg"/>
        <p className="messegeText">
          {messages?.text}
        </p>
        </div>
      <div className="messegeButtom">{format(messages?.createdAt)}</div>
    </div>
  )
}