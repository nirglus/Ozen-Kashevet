import React, { useEffect, useState } from 'react'
import ChatTitle from './chatTitle'
import ChatCard from './chatCard'
import axios from 'axios';
import APIBaseUrl from '../../config/baseUrl';

export default function ChatPrev({ setCurrentChat }) {
  //TODO: replace with real user
  const user = {}
  //TODO: replace with real conversation
  const [conversations, setConversations] = useState([{}]);

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

  return (
    <>
      <section className='flex flex-col'>
        <div className='h-15 border '>
          <ChatTitle />
        </div>
        <div className=''>
          {conversations.map((c, cINdex) => (
            <div onClick={() => setCurrentChat(c)} key={cINdex}>
              <ChatCard conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
