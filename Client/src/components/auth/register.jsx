import React, { useContext } from 'react'
import { UserContext } from '../../managers/userManager'

export default function Register() {
    const { handleRegister } = useContext(UserContext)
    return (
        <div className='w-screen h-fit p-12'>
            <div className="w-full px-6">
                <label className=''>Email</label>
                <input className='w-full border-b-2 border-black' name='email'></input>
            </div>
            <div className="w-full px-6">
                <label className=''>UserName</label>
                <input className='w-full border-b-2 border-black' name='user_name'></input>
            </div>
            <div className="w-full px-6">
                <label className=''>Password</label>
                <input type='password' className='w-full border-b-2 border-black' name='password'></input>
            </div>
            <div className="w-full px-6">
                <label className=''>bio</label>
                <input type='text' className='w-full border-b-2 border-black' name='bio'></input>
            </div>
            <div className="w-full px-6">
                <label className=''>birthdate</label>
                <input type='date' className='w-full border-b-2 border-black' name='birth_date'></input>
            </div>
            <span>gender:</span>
            <div>
                <label htmlFor='psycho'>man</label>
                <input id='psycho' type='radio' name='gender' value={"M"}></input>
                <label htmlFor='user'>women</label>
                <input id='user' type='radio' name='gender' value={"W"}></input>
                <label htmlFor='user'>other</label>
                <input id='user' type='radio' name='gender' value={"O"}></input>
            </div>
            <span>Role:</span>
            <div>
                <label htmlFor='psycho'>Psycho</label>
                <input id='psycho' type='radio' name='role' value={"PF"}></input>
                <label htmlFor='user'>User</label>
                <input id='user' type='radio' name='role' value={"user"}></input>
            </div>
            <button onClick={handleRegister}>register</button>
        </div>
    )
}
