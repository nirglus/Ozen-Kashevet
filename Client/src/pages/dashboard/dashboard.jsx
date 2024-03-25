import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./modal"; // Assuming you have a Modal component
import { IoChatbubble } from "react-icons/io5";


export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full h-[95vh] items-center flex flex-wrap justify-around">
            <section id="menu" className="flex flex-wrap justify-center w-full h-[30vh] items-center">
                <h1 className="w-full font-bold font-size flex justify-center">DASHBOARD</h1>
                <div className="flex w-full justify-center gap-3">
                    <NavLink to='/chat'><button className="menuButton">Chat with a professional</button></NavLink>
                    <button className="menuButton" onClick={openModal}>AI Chatbot</button>
                    <button className="menuButton">My Meetings</button>
                </div>
                <div className="flex w-full justify-center gap-3">
                    <NavLink to='/chat'><button className="menuButton">My Chats</button></NavLink>
                    <button className="menuButton">Read Helpful articles</button>
                    <button className="menuButton">PLACEHOLDER</button>
                </div>
            </section>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex items-center">
                    <IoChatbubble className="mr-2 text-xl" />
                    <h2 className="text-lg font-semibold">Chatbot</h2>
                </div>
                <div className="h-[50%] w-full border border-black"></div>
                <div>
                    <input className="w-[90%] h-10 border border-black p-2" placeholder="Type Your Message:"></input>
                    <button className="bg-red-500 p-2 border border-black" onClick={closeModal}>close</button>
                </div>
            </Modal>
        </div>
    );
}