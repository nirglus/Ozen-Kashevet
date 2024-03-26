import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoChatbubble } from 'react-icons/io5';

const ModalPsycho = ({ setModalOpen, therapist }) => {
    console.log(therapist);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 flex">
            <div className="bg-white p-6 rounded-lg shadow-lg h-[80vh] w-[50vw] flex  flex-wrap justify-between flex-col">
            <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">{therapist.user_name}</h2>
                    </div>
                    <button onClick={()=>setModalOpen(false)} className="text-3xl" ><IoMdClose className="hover:text-red-600" /></button>
                </div>
            </div>
        </div>
    );
};

export default ModalPsycho;
