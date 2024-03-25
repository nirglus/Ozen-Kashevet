import React from 'react'

export default function Register() {
    return (
        <div className='w-screen h-fit p-12'>
            <div className="w-full px-6">
                <label className=''>Email</label>
                <input className='w-full border-b-2 border-black'></input>
            </div>
            <div className="w-full px-6">
                <label className=''>UserName</label>
                <input className='w-full border-b-2 border-black'></input>
            </div>
            <div className="w-full px-6">
                <label className=''>Password</label>
                <input type='password' className='w-full border-b-2 border-black'></input>
            </div>
            <span>Role:</span>
            <div>
                <label htmlFor='psycho'>Psycho</label>
                <input id='psycho' type='radio'></input>
                <label htmlFor='user'>User</label>
                <input id='user' type='radio'></input>
            </div>
        </div>
    )
}
