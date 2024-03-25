import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function Dashboard() {
    const [popUp, setPopUp] = useState('hidden')


    return (
        <div className="w-full h-[95vh] items-center flex flex-wrap justify-around">
            <section id="menu" className="flex flex-wrap justify-center w-full h-[30vh] items-center">
                <h1 className="w-full font-bold font-size flex justify-center">DASHBOARD</h1>
                <div className="flex w-full justify-center gap-3">
                    <NavLink to='/chat'><button className="menuButton">Chat with a proffesional</button></NavLink>
                    <button className="menuButton">AI Chatbot</button>
                    <button className="menuButton">My Meetings</button>
                </div>
                <div className="flex w-full justify-center gap-3">
                    <NavLink to='/chat'><button className="menuButton">My Chats</button></NavLink>
                    <button className="menuButton">Read Helpful articles</button>
                    <button className="menuButton">PLACEHOLDER</button>
                </div>
            </section>
        </div>
    )
}