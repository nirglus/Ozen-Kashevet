import React, { useEffect, useState } from 'react'
import axios from 'axios';
import logo from '../../assets/img/Anonimos.png'
import { APIBaseUrl } from '../../config/baseUrl';
// import "chatOnline.css"
export default function ChatOnline({onlineUsers, currentId , setCurrentChat}) {
  const [Psyco , setPsyco] = useState([]);
  const [onlineFriends , setOnlineFriends] = useState([])
  useEffect(()=>{
    const getPsyco = async()=>{
      const res = await axios.get(`${APIBaseUrl}/users/find`)
      setPsyco(res.data.users)
    }
    getPsyco()
  },[currentId])
  console.log(Psyco);
  useEffect(() => {
    const filteredFriends = Psyco.filter(Psyco => {
      return onlineUsers.some(onlineUser => onlineUser.userId === Psyco._id);
    });
    setOnlineFriends(filteredFriends);
  }, [Psyco, onlineUsers]);

  const handleClick = async(user)=>{
    try{
      const res = await axios.get(`${APIBaseUrl}/room/find/${user._id}`)
      if (res.data) {
        setCurrentChat(res.data)
      }else{
        const res = await axios.post(`${APIBaseUrl}/room`, {
          reciverId: user._id
        });
        setCurrentChat(res.data);
    }}
    catch(err){
      console.log(err);
    }
  }
  console.log(onlineFriends);
  return (
    <div className='chatOnline'>
      {onlineFriends.map((o)=>(
      <div className="chatOnlineFriends" onClick={()=>handleClick(o)}>
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