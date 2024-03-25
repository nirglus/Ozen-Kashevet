import React, { useEffect, useRef, useState } from 'react'
import ChatPrev from '../../components/chat/chatPrev'
import ChatRoom from '../../components/chat/chatRoom'
import ChatOnline from '../../components/chat/chatOnline'
import axios from "axios";
import { io } from "socket.io-client"
import APIBaseUrl from '../../config/baseUrl'


export default function chatPage() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState("");
    const [arrivalMessages, setArrivalMessages] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef()
    const { user } = {}
    const scrollRef = useRef()

    //get messages
    //!copied to chatRoom
    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArrivalMessages({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }
        , [])

    //if message live 
    //!copied to chatRoom
    useEffect(() => {
        if (arrivalMessages && currentChat?.members.includes(arrivalMessages.sender)) {
            setMessages(prevMessages => [...prevMessages, arrivalMessages]);
        }
    }, [arrivalMessages, currentChat]);

    //!copied to chaTOnline
    useEffect(() => {
        socket.current.emit("addUser", user.id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(users);
        })
    }
        , [user])
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
    //!copied to chatRoom
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (
        <>
            <main className='flex w-screen'>
                <div className='border p-8 flex-1 h-screen' id='chatPrev'>
                    <ChatPrev setCurrentChat={setCurrentChat} />
                </div>
                <div className='border p-8 flex-three h-screen' id='chatRoom'>
                    <ChatRoom currentChat={setCurrentChat} />
                </div>
                <div className='border p-8 flex-50 h-screen' id='onlines'>
                    <ChatOnline />
                </div>
            </main>
        </>
    )
}
