import React, { useContext } from 'react'
import { UserContext } from '../../managers/userManager'

export default function Login() {
  const { handleLogin } = useContext(UserContext)
  return (
    <div className='w-screen h-fit p-12'>
      <div className="w-full px-6">
        <label className=''>Username</label>
        <input className='w-full border-b-2 border-black'></input>
      </div>
      <div className="w-full px-6">
        <label className=''>Password</label>
        <input className='w-full border-b-2 border-black'></input>
      </div>
      <button onClick={handleLogin}>login</button>
    </div>
  )
}
