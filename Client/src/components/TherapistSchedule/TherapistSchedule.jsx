import {useState, useEffect} from 'react'
import axios from 'axios';
import { APIBaseUrl } from '../../config/baseUrl';

function TherapistSchedule({user}) {
    const [selectedDates, setSelectedDates] = useState(Array(5).fill({ date: "", time: "" }));
    const [isUploaded, setIsUploaded] = useState(false);

    const handleDateChange = (index, e) => {
        const { name, value } = e.target;
        setSelectedDates(prevDates => {
            const updatedDates = [...prevDates];
            updatedDates[index] = { ...updatedDates[index], [name]: value };
            console.log(updatedDates);
            return updatedDates;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mergedDates = selectedDates.map(date => {
            const mergedDateTime = new Date(date.date + " " + date.time);
            console.log({user});
            return mergedDateTime.toISOString();
        });
        try {
            const responses = await Promise.all(
                mergedDates.map(date => axios.post(`${APIBaseUrl}/meetings`, { date, therapist_id: `${user.id}` }))
            );
    
            console.log(responses);
            console.log("Dates uploaded");
            setIsUploaded(true);
        } catch (error) {
            console.error(error);
        }
        console.log(mergedDates);
    };

    return (
        <div className="profile flex items-center flex-col justify-center gap-4">
            {!isUploaded ? (
                <>
                <h1 className='text-bold font-extrabold'>Set your schedule</h1>
                <form className='flex items-center flex-col justify-center' onSubmit={handleSubmit}>
                    {selectedDates.map((date, index) => (
                        <div key={index} className="mb-4 flex">
                            <div className='flex items-center gap-3'>
                                <label htmlFor={`date-${index}`} className="block mb-1">Date {index + 1}</label>
                                <input 
                                    type="date" 
                                    id={`date-${index}`} 
                                    name="date" 
                                    value={date.date} 
                                    onChange={e => handleDateChange(index, e)} 
                                    className="border border-gray-400 rounded-md p-2 mr-2"
                                    required
                                />
                            </div>
                            <div className='flex items-center gap-3'>
                                <label htmlFor={`time-${index}`} className="block mb-1">Time {index + 1}</label>
                                <input 
                                    type="time" 
                                    id={`time-${index}`} 
                                    name="time" 
                                    value={date.time} 
                                    onChange={e => handleDateChange(index, e)} 
                                    className="border border-gray-400 rounded-md p-2"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700  text-white py-2 px-4 rounded-md">Submit</button>
                </form>
                
                </>
            ) : (
                <div className='min-h-[300px] flex items-center justify-center flex-col'>
                    <img className="w-20" src="https://cliply.co/wp-content/uploads/2021/03/372103860_CHECK_MARK_400px.gif" alt="checkmark" />
                    <h2>Schedule updated!</h2>
                </div>
            )}
        </div>
    );
}

export default TherapistSchedule
