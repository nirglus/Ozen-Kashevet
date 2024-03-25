import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/Anonimos.png'
import axios from 'axios';
import { APIBaseUrl } from '../../config/baseUrl';

export default function ChatPrev({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser.id);
    const getUser = async () => {
      try {
        const res = await axios.get(`${APIBaseUrl}/users?userId=${friendId}`);
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
  console.log(user);
  return (
    <div className='conversation'>
      <img className="conversationsimg" alt="" src={user?.profileImg? user.profileImg :logo} />
      <span className="conversationText">{user?.username}</span>
    </div>
  );
}