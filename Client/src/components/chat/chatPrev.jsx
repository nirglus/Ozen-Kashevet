import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/Anonimos.png'
import axios from 'axios';
import { APIBaseUrl } from '../../config/baseUrl';
import "./chatprev.css"
export default function ChatPrev({ conversation, currentUser ,setChosseUser }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser.id);
    const getUser = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/users/findUser?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
        setUser(null);

      }
    };
    if (friendId) {
      getUser();
    }
  }, [currentUser, conversation]);
  return (
    <div className='conversation' onClick={()=>setChosseUser(user)}>
      <img className="conversationsimg" alt="" src={user?.profileImg? user.profileImg :logo} />
      <span className="conversationText">{user?.user_name}</span>
    </div>
  );
}