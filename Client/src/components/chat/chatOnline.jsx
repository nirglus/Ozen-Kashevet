import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import logo from '../../assets/img/Anonimos.png'
import { APIBaseUrl } from '../../config/baseUrl';
import "./chatOnline.css"
import { UserContext } from '../../managers/userManager';
export default function ChatOnline({onlineUsers, currentId , setCurrentChat}) {
  const { user , token } = useContext(UserContext)
  const [Clients , setClients] = useState([]);
  const [therapist , setTherapist] = useState([]);
  const [onlineUser , setOnlineUsers] = useState([])
  const [onlineTherapist , setOnlineTherapist] = useState([])

  useEffect(() => {
    const getClientsUsers = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/users/find?role=user`);
        // Assuming res.data.users is an array of user objects
        const filteredUsers = res.data.users.filter((username) => username._id !== user.id);
        setClients(filteredUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getClientsUsers();
  }, [APIBaseUrl, user.id, currentId]);

  useEffect(() => {
    const getTherapist = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/users/find?role=therapist`);
        // Assuming res.data.users is an array of user objects
        const filteredUsers = res.data.users.filter((username) => username._id !== user.id);
        setTherapist(filteredUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getTherapist();
  }, [APIBaseUrl, user.id, currentId]);
  
  useEffect(() => {
    const filteredFriends = therapist.filter(Clients => {
      return onlineUsers.some(onlineTherapist => onlineTherapist.userId === Clients._id);
    });
    setOnlineTherapist(filteredFriends);
  }, [Clients, onlineUsers]);

  useEffect(() => {
    const filteredFriends = Clients.filter(Clients => {
      return onlineUsers.some(onlineUser => onlineUser.userId === Clients._id);
    });
    setOnlineUsers(filteredFriends);
  }, [Clients, onlineUsers]);
  const handleClick = async(user)=>{
    try{
      const res = await axios.get(`${APIBaseUrl}/room/find/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.data) {
        setCurrentChat(res.data)
      }else{
        const res = await axios.post(`${APIBaseUrl}/room/`, 
            {
              reciverId: user._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
        })
        setCurrentChat(res.data);
    }}
    catch(err){
      console.log(err);
    }
  }
  console.log(onlineTherapist);
  return (
    <div className='chatOnline'>
      <h1 className='font-bold border-solid mb-4 text-center'>Online users</h1>
      {onlineUser.map((o)=>(
      <div className="chatOnlineFriends" onClick={()=>handleClick(o)}>
        <div className="chatOnlineImgContainer">
            <img src={o?.profileImg? o.profileImg :logo} alt="" className='chatOnlineImg'/>
            <div className="cahatOnlineBadge">
            </div>
        </div>
        <span  className="chatOnlineName">{o.user_name}</span>
      </div>
      ))}
      <br />
        <h1 className='font-bold border-solid border-t-2 border-t-slate-950 mb-4 text-center' >therapist:</h1> 
      {onlineTherapist.map((o)=>(
      <div className="chatOnlineFriends">
        <div className="chatOnlineImgContainer">
            <img src={o?.profileImg? o.profileImg :logo} alt="" className='chatOnlineImg'/>
            <div className="cahatOnlineBadge">
            </div>
        </div>
        <span  className="chatOnlineName">{o.user_name}</span>
      </div>
      ))}
    </div>
  )
}