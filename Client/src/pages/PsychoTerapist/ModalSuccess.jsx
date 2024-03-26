import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { SlLike } from "react-icons/sl";

export default function ModalSuccess({ setIsSetMeUp, setModalOpen }) {
    const closeModales = ()=>{
        setModalOpen(false);
        setIsSetMeUp(false);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-lg shadow-lg h-fit w-fit flex  flex-wrap flex-col">
                <div className="flex items-center justify-between gap-7">
                    <div className="flex items-center ">
                        <h2 className="text-lg font-semibold">we sign you up!</h2>
                    </div>
                    <button className="text-3xl" >
                        <FaCheck onClick={closeModales} className="hover:text-green-600" />
                    </button>
                </div>
                <div className='flex flex-col'>

                </div>
            </div>
        </div>
    )
}
