import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./modal";
// import MeetingModal from "./myMeetingsModal";
import { IoChatbubble } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import AITherapist from "../../components/AITherapist/AITherapist";
import axios from "axios";
import { APIBaseUrl } from "../../config/baseUrl";
import { UserContext } from "../../managers/userManager";



export default function Dashboard() {

    const { user } = useContext(UserContext)

    const [meetingsData, setMeetingsData] = useState([]);
    const [AIModalOpen, setAIModalOpen] = useState(false);
    const [myMeetingOpen, setMyMeetingsOpen] = useState(false)

    const openMeetingModal = () => {
        setMyMeetingsOpen(true);
    };

    const closeMeetingModal = () => {
        setMyMeetingsOpen(false);
    };

    const openAiModal = () => {
        setAIModalOpen(true);
    };

    const closeAiModal = () => {
        setAIModalOpen(false);
    };

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const result = await axios.get(`${APIBaseUrl}/meetings/?user_id=${user.id}`);
                const allMeetingsData = result.data.data;
                setMeetingsData(allMeetingsData);
            } catch (error) {
                console.log(error, 'error getting meetings');
            }
        };

        fetchMeetings();
    }, []);

    return (<div className="px-20">

        <div className="w-full">
            <h1 className=" font-bold text-5xl flex justify-start">DASHBOARD</h1>
            <h2 className=" font-semibold text-4xl flex justify-start">User Panel</h2>
            <div className="w-full h-[0.2rem] bg-[#000000cf]"></div>
        </div>


        <div className="w-full h-[82vh] items-center flex flex-wrap justify-around">
            <section id="menu" className="flex flex-wrap justify-center w-full h-[30vh] items-center">
                <div className="flex w-full justify-center gap-3 mb-6">
                    <NavLink to='/chat'><button className="menuButton">Chat with a professional</button></NavLink>
                    <button className="menuButton" onClick={openAiModal}>AI Chatbot</button>
                    <button className="menuButton" onClick={openMeetingModal}>My Meetings</button>
                </div>
                <div className="flex w-full justify-center gap-3">
                    <NavLink to='/chat'><button className="menuButton">Profile</button></NavLink>
                    <button className="menuButton">Read Helpful articles</button>
                    <NavLink to='/therapists'><button className="menuButton">Set a meet</button></NavLink>
                </div>
            </section>
            <Modal isOpen={AIModalOpen} onClose={closeAiModal}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <IoChatbubble className="mr-2 text-xl" />
                        <h2 className="text-lg font-semibold">Chatbot</h2>
                    </div>
                    <button className="text-3xl" onClick={closeAiModal}><IoMdClose className="hover:text-red-600" /></button>
                </div>
                <AITherapist />
            </Modal>

            <Modal isOpen={myMeetingOpen} onClose={closeMeetingModal}>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <CiBoxList className="mr-2 text-xl" />
                        <h2 className="text-lg font-semibold">My Meetings</h2>
                    </div>
                    <button className="text-3xl" onClick={closeMeetingModal}><IoMdClose className="hover:text-red-600" /></button>
                </div>
                {meetingsData.map((meeting) => {
                    return (
                        <div key={meeting.id}>
                            {meeting.date}
                        </div>
                    );
                })}

            </Modal>
        </div>







    </div>

    );
}