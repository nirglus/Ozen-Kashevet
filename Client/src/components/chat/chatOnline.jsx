import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { APIBaseUrl } from '../../config/baseUrl';

export default function ChatOnline({onlineUsers, currentId , setCurrentChat}) {
  const [friends , setFriend] = useState([]);
  const [onlineFriends , setOnlineFriends] = useState([])
  useEffect(()=>{
    const getFriends = async()=>{
      const res = await axios.get(`${APIBaseUrl}/users/`)
      setFriend(res.data)
    }
    getFriends()
  },[currentId])
  useEffect(() => {
    const filteredFriends = friends.filter(friend => {
      return onlineUsers.some(onlineUser => onlineUser.userId === friend._id);
    });
    setOnlineFriends(filteredFriends);
  }, [friends, onlineUsers]);
  const handleClick = async(user)=>{
    try{
      const res = await axios.get(`${APIBaseUrl}/convers/find/${currentId}/${user._id}`)
      if (res.data) {
        setCurrentChat(res.data)
      }else{
        const res = await axios.post(`${APIBaseUrl}/convers`, {
          SenderId: currentId,
          reciverId: user._id
        });
        setCurrentChat(res.data);
    }}
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className='chatOnline'>
      {onlineFriends.map((o)=>(
      <div className="chatOnlineFriends" onClick={()=>handleClick(o)}>
        <div className="chatOnlineImgContainer">
            <img src={o?.profileImg? o.profileImg :logo} alt="" className='chatOnlineImg'/>
            <div className="cahatOnlineBadge">
            </div>
        </div>
        <span  className="chatOnlineName">{o.username}</span>
      </div>
      ))}
    </div>
  )
}