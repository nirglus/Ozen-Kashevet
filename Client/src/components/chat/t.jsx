import React, { useContext, useEffect, useRef, useState } from "react";
import "./messages.css";
import Conversation from "../components/conversations/Conversation";
import Messege from "../components/messege/Messege";
import ChatOnline from "../components/chatOnline/ChatOnline";
import { UserContext } from "../context/User";
import axios from "axios";
import { APIBaseUrl } from "../config";
import {io} from "socket.io-client"
export default function messages() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket =useRef()
  const { user } = useContext(UserContext);
  const scrollRef = useRef()

  //get messages
  //!copied to chatRoom
  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage" , data =>{
      setArrivalMessages({
        sender:data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }
  ,[])

  //if message live 
  //!copied to chatRoom
useEffect(() => {
  if (arrivalMessages && currentChat?.members.includes(arrivalMessages.sender)) {
    setMessages(prevMessages => [...prevMessages, arrivalMessages]);
  }
}, [arrivalMessages,currentChat]);

//!copied to chaTOnline
useEffect(() => {
  socket.current.emit("addUser" ,user.id);
  socket.current.on("getUsers" , users=>{
    setOnlineUsers(users);
  })
}
,[user])
console.log(onlineUsers);
//! copied to chatPrev
  useEffect(() => {
    const getsConverstions = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/convers/${user.id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getsConverstions();
  }, [user.id]);
  //! copied to chatRoom
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/mess/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  //!copied to  chat Room
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const mess = {
      sender: user.id,
      text: newMessages,
      conversetionId: currentChat._id
    }
    const receiverId = currentChat.members.find(member=> member !== user.id)
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text:newMessages
    })
    try {
      const res = await axios.post(`${APIBaseUrl}/mess` , mess);
      console.log(res);
      setMessages([...messages ,res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  }
  //!copied to chatRoom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages]);
  return (
    <div className="messengers">
      <div className="chatMenu">
        <div className="chatMenuWarpper">
          <input
            type="text"
            placeholder="search for friends"
            className="chatMenuInput"
          />
          {conversations.map((c, cINdex) => (
            <div onClick={() => setCurrentChat(c)} key={cINdex}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWarpper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Messege messages={m} own={m.sender === user.id} />
                  </div>
                ))}
              </div>
              <div className="chatBoxButtom">
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
      <div className="chatOnline">
        <div className="chatOnlineWarpper">
          <ChatOnline onlineUsers={onlineUsers} currentId={user.id} setCurrentChat={setCurrentChat}/>
        </div>
      </div>
    </div>
  );
}