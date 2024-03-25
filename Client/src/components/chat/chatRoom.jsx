import React from 'react'
import logo from '../../assets/img/Anonimos.png'
export default function Messege({messages , own}) {
  console.log(messages);
  return (
    <div className={own? "messege own" : "messege"}>
      <div className="messegeTop">
        <img src={logo} alt="" className="messegeImg"/>
        <p className="messegeText">
          {messages?.text}
        </p>
        </div>
      <div className="messegeButtom">{messages?.createdAt}</div>
    </div>
  )
}