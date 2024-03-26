import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import logo from '../../assets/img/Anonimos.png'
import { APIBaseUrl } from '../../config/baseUrl';
import "./chatOnline.css"
import { UserContext } from '../../managers/userManager';
export default function ChatOnline({onlineUsers, currentId , setCurrentChat}) {
  const { user , token } = useContext(UserContext)
  const [Psyco , setPsyco] = useState([]);
  const [therapist , setTherapist] = useState([]);
  const [onlineUser , setOnlineUsers] = useState([])
  const [onlineTherapist , setOnlineTherapist] = useState([])

  useEffect(() => {
    const getPsycoUsers = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/users/find?role=user`);
        // Assuming res.data.users is an array of user objects
        const filteredUsers = res.data.users.filter((username) => username._id !== user.id);
        setPsyco(filteredUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getPsycoUsers();
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
    const filteredFriends = therapist.filter(Psyco => {
      return onlineUsers.some(onlineTherapist => onlineTherapist.userId === Psyco._id);
    });
    setOnlineTherapist(filteredFriends);
  }, [Psyco, onlineUsers]);

  useEffect(() => {
    const filteredFriends = Psyco.filter(Psyco => {
      return onlineUsers.some(onlineUser => onlineUser.userId === Psyco._id);
    });
    setOnlineUsers(filteredFriends);
  }, [Psyco, onlineUsers]);
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
        <h1 className='font-bold border-solid border-t-2 border-t-slate-950 mb-4' >doctors:</h1> 
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