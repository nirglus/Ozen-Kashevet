import React, { useEffect, useRef, useState } from 'react'
import Message from './message'
import { io } from "socket.io-client"
import axios from 'axios'
import APIBaseUrl from '../../config/baseUrl'




export default function ChatRoom({ currentChat }) {
  const socket = useRef()
  const scrollRef = useRef()

  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const mess = {
      sender: user.id,
      text: newMessages,
      conversetionId: currentChat._id
    }
    const receiverId = currentChat.members.find(member => member !== user.id)
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessages
    })
    try {
      const res = await axios.post(`${APIBaseUrl}/mess`, mess);
      console.log(res);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="chatBox">
        <div className="chatBoxWarpper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message messages={m} own={m.sender === user.id} />
                  </div>
                ))}
              </div>
              <div className="fixed bottom-0">
                <textarea
                  placeholder="write Something"
                  className="chatmessegeInput"
                  onChange={(e) => setNewMessages(e.target.value)}
                  value={newMessages}
                ></textarea>
                <button className="messegeSubmitButton" onClick={handleSubmit}>Send</button>
              </div>
            </>
          ) : (
            <span className="noConversation">
              open a conversation to start a chat
            </span>
          )}
        </div>
      </div>
      <div>
      </div>
    </>
  )
}
