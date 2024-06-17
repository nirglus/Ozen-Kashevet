import React, { useContext, useEffect, useRef, useState } from "react";
import ChatPrev from "../../components/chat/chatPrev";
import ChatRoom from "../../components/chat/chatRoom";
import ChatOnline from "../../components/chat/chatOnline";
import axios from "axios";
import { io } from "socket.io-client";
import { UserContext } from "../../managers/userManager";
import { APIBaseUrl } from "../../config/baseUrl";
import "./chatpage.css";
import { IoMdCall } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function chatPage() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [ChosseUser, setChosseUser] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user, token } = useContext(UserContext);
  const scrollRef = useRef();
  //get messages
  //!copied to chatRoom
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKET_IO_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessages({
        sender: data.senderId,
        message_content: data.message_content,
        createdAt: Date.now(),
      });
    });
  }, []);
  const handleChatClick = (clickedChat) => {
    if (currentChat && currentChat === clickedChat) {
      // Clicked the same chat again, set currentChat to null
      setCurrentChat(null);
    } else {
      setCurrentChat(clickedChat);
    }
  };

  useEffect(() => {
    AOS.init();
  }, [])

  //if message live
  //!copied to chatRoom
  useEffect(() => {
    if (
      arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender)
    ) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessages]);
    }
  }, [arrivalMessages, currentChat]);

  //!copied to chaTOnline
  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //! copied to chatPrev
  useEffect(() => {
    const getsConverstions = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/room/getRooms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
        const res = await axios.get(
          `${APIBaseUrl}/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  //!copied to  chat Room
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mess = {
      message_content: newMessages,
      room_id: currentChat._id,
    };
    if(mess.message_content == ""){
        alert("u need to write someting")
    }else{
        const receiverId = currentChat.members.find((member) => member !== user.id);
        socket.current.emit("sendMessage", {
          senderId: user.id,
          receiverId,
          message_content: newMessages,
        });
        try {
          const res = await axios.post(`${APIBaseUrl}/messages`, mess, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMessages([...messages, res.data]);
          setNewMessages("");
        } catch (err) {
          console.log(err);
        }
      };
    }
  //!copied to chatRoom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="messengers">
        <div className="chatMenu">
          <div className="chatMenuWarpper">
            <input
              type="text"
              placeholder="search for friends"
              className="chatMenuInput"
            />
            {conversations.map((c) => {
              return (
                <div onClick={() => handleChatClick(c)}>
                  <ChatPrev
                    conversation={c}
                    currentUser={user}
                    setChosseUser={setChosseUser}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWarpper">
            {currentChat ? (
              <>
                <div className="h-14 bg-blue-400 bg-opacity-30 rounded-md flex items-center justify-between px-4">
                  <div className="flex items-center">
                    <img
                      src={ChosseUser.profileImg}
                      alt=""
                      className="rounded-full h-10 w-10 mr-2"
                    />
                    <h1 className="font-bold text-lg text-gray-600">
                      {ChosseUser.user_name}
                    </h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white">
                      <IoMdCall className="text-gray-600" />
                    </div>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white">
                      <IoIosMore className="text-gray-600" />
                    </div>
                  </div>
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <ChatRoom messages={m} own={m.sender === user.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxButtom" >
                  <textarea 
                    placeholder="Write something..."
                    className="chatmessegeInput"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                  ></textarea>
                  <button
                    className="messegeSubmitButton"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
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
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
