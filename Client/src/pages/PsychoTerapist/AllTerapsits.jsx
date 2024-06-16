import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { APIBaseUrl } from '../../config/baseUrl';
import ModalPsycho from './ModalPsycho';

export default function AllTerapsits() {
    const [therapists, setTherapists] = useState([]);
    const [therapist, setTherapist] = useState()
    const [isModalOpen, setModalOpen] = useState(false)
    const getTherapist = async () => {
        try {
            const res = await axios.get(`${APIBaseUrl}/users/find?role=therapist`);
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
        <>
            <div className="w-full items-center flex flex-wrap justify-around p-7 gap-4">
                {
                    isModalOpen ?
                        <ModalPsycho setModalOpen={setModalOpen} therapist={therapist} />
                        : null
                }
                {
                    therapists.map(therapist => (
                        <div onClick={() => openModal(therapist)} className='card hover:shadow-lg hover:-translate-y-1 hover:opacity-75 transition-all  bg-white border w-96 p-4 flex flex-col gap-2 rounded-lg' key={therapist._id}>
                            <h1 className='text-4xl'>{therapist.user_name}</h1>
                            <p><b>Gender: </b> {therapist.gender == 'M' ? 'Male' : 'Female'}</p>
                            <p><b>Email: </b> {therapist.email}</p>
                            <p><b>License: </b> {therapist.bio}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
