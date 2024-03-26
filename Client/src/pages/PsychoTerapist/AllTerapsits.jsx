import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { APIBaseUrl } from '../../config/baseUrl';
import ModalPsycho from './ModalPsycho';

export default function AllTerapsits() {
    const [therapists, setTherapists] = useState([]);
    const [therapist,setTherapist ] = useState()
    const [isModalOpen, setModalOpen] = useState(false)
    const getTherapist = async () => {
        try {
            const res = await axios.get(`${APIBaseUrl}/users/find?role=therapist`);
            // Assuming res.data.users is an array of user objects
            console.log(res.data.users);
            setTherapists(res.data.users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getTherapist()

    }, [])

    const openModal = (ther) => {
        setModalOpen(true)
        setTherapist(ther)
    }

    return (
        <div className="w-full h-[95vh] items-center flex flex-wrap justify-around">
            {
                isModalOpen ?
                    <ModalPsycho setModalOpen={setModalOpen} therapist={therapist} />
                    : null
            }
            {
                therapists.map((therapist, i) => (
                    <div onClick={() => openModal(therapist)} className='border bg-black text-white w-96 p-4' key={therapist._id}>
                        <h1>{therapist.user_name}</h1>
                        {/* <p>{therapist.email}</p> */}
                    </div>
                ))
            }
        </div>
    )
}
