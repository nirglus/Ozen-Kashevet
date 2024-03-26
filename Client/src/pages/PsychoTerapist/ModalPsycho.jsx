import React from 'react';
import { IoChatbubble } from 'react-icons/io5';

const ModalPsycho = ({ setModalOpen, therapist }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-lg shadow-lg h-[80vh] w-[50vw] flex  flex-wrap justify-between flex-col">
            <div className="flex items-center">
                    <h2 className="text-lg font-semibold">Chatbot</h2>
                </div>
                <div className="h-[50%] w-full border border-black"></div>
                <div>
                    <input className="w-[90%] h-10 border border-black p-2" placeholder="Type Your Message:"></input>
                    <button className="bg-red-500 p-2 border border-black">close</button>
                </div>
            </div>
        </div>
    );
};

export default ModalPsycho;
