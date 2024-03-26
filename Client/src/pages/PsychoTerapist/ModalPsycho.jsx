import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { APIBaseUrl } from '../../config/baseUrl';
import { UserContext } from '../../managers/userManager';
import ModalSuccess from './ModalSuccess';

const ModalPsycho = ({ setModalOpen, therapist }) => {
    const { user } = useContext(UserContext)
    const [meetings, setMeetings] = useState([])
    const [avaibleMeetings, setAvaibleMeetings] = useState([])
    const [isSetMeUp, setIsSetMeUp] = useState(false)

    const getTherapistMeetings = async () => {
        const res = await axios.get(`${APIBaseUrl}/meetings?therapist_id=${therapist._id}`);
        // const therapist = await response.json();
        setMeetings(res.data.data);
        const filteredMeeting = meetings.filter((meeting) => meeting.available !== false)
        setAvaibleMeetings(filteredMeeting)
    }

    function formatDateAndTime(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hour}:${minute}`;
    }
    const setMeUp = async (meeting) => {
        const res = await axios.patch(`${APIBaseUrl}/meetings/${meeting._id}`, {
            available: false,
            user_id: user.id
        })
        setIsSetMeUp(true);
        getTherapistMeetings();
    }

    useEffect(() => {
        getTherapistMeetings()

    }, [meetings.length])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            {
                isSetMeUp ?
                    <ModalSuccess setModalOpen={setModalOpen} setIsSetMeUp={setIsSetMeUp} />
                    : null
            }
            <div className="bg-white p-6 rounded-lg shadow-lg h-fit w-[50vw] flex  flex-wrap flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">{therapist.user_name}</h2>
                    </div>
                    <button onClick={() => setModalOpen(false)} className="text-3xl" ><IoMdClose className="hover:text-red-600" /></button>
                </div>
                <div className='flex flex-col'>
                    {
                        avaibleMeetings.map((meeting, i) => (
                            <div className='border flex justify-between items-center p-5' key={i}>
                                <div className='flex flex-col gap-2'>
                                    <h1>Avaible meeting</h1>
                                    <p>{formatDateAndTime(meeting.date)}</p>
                                </div>
                                <div className='items-center'>
                                    <button onClick={() => setMeUp(meeting)}>Set me up!</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ModalPsycho;
