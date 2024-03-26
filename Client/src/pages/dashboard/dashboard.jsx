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
import ReadHelpArticle from "../../components/readHelpArticle/ReadHelpArticle";
import UserProfile from "../profile/UserProfile";
import logoImg from '../../assets/img/logoWithText.png'

export default function Dashboard() {

    const { user } = useContext(UserContext)

    const [meetingsData, setMeetingsData] = useState([]);
    const [AIModalOpen, setAIModalOpen] = useState(false);
    const [myMeetingOpen, setMyMeetingsOpen] = useState(false)
    const [articleOpen, setArticleOpen] = useState(false);




    const openArticleModal = () => {
        setArticleOpen(true);
    };

    const closeArticleModal = () => {
        setArticleOpen(false);
    };

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


    function formatDateAndTime(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hour}:${minute}`;
    }


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

    return (<div className="px-20 bg-[#fff]">
<div className="w-full">
  <div className="flex items-center justify-between">
    <div>
      <h1 className="font-bold text-5xl">DASHBOARD</h1>
      <h2 className="font-semibold text-4xl">User Panel</h2>
    </div>
    <img className="h-20" src={logoImg} alt="Logo"></img>
  </div>
  <div className="w-full h-[0.2rem] bg-[#000000cf]"></div>
</div>

        <div className="w-full h-[70vh] items-center flex flex-wrap justify-around">
            <section id="menu" className="flex flex-wrap justify-center w-full h-[30vh] items-center">
                <div className="flex w-full justify-around mb-6 text-lg">
                    <NavLink to='/chat'><button className="menuButton bg-[#EDD382] hover:shadow-lg hover:-translate-y-1 hover:opacity-75 transition-all shadow-xl shadow-slate-300">Chat with a professional</button></NavLink>
                    <button className="menuButton bg-[#c2efb3] hover:shadow-lg hover:-translate-y-1 hover:opacity-75 transition-all shadow-xl shadow-slate-300" onClick={openAiModal}>AI Chatbot</button>
                    <button className="menuButton bg-[#EDD382] hover:shadow-lg hover:-translate-y-1 hover:opacity-75 transition-all shadow-xl shadow-slate-300" onClick={openMeetingModal}>My Meetings</button>
                </div>
                <div className="flex w-full justify-around  text-lg">
                    <NavLink to={'/profile'}><button className="menuButton bg-[#EDD382] hover:shadow-lg hover:-translate-y-1 hover:opacity-75 transition-all shadow-xl shadow-slate-300">Profile</button></NavLink>
                    <button className="menuButton bg-[#F96E46] hover:shadow-lg hover:-translate-y-1 hover:opacity-75 transition-all shadow-xl shadow-slate-300" onClick={openArticleModal}>Read Helpful articles</button>
                    <NavLink to='/therapists'><button className="menuButton bg-[#EDD382] hover:shadow-lg hover:-translate-y-1 hover:opacity-75 transition-all shadow-xl shadow-slate-300">Schedule Therapy</button></NavLink>
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

                {meetingsData.map( (meeting) => {
                    return (
                        <div className="bg-gray-100 p-4 rounded-lg" key={meeting.id}>
                            {formatDateAndTime(meeting.date)}

                        </div>
                    );
                })}

            </Modal>
            <Modal isOpen={articleOpen} onClose={closeArticleModal}>
                <div className="bg-white rounded-lg shadow-xl p-6 max-h-full overflow-y-auto">
                    <div className="flex sticky items-center justify-between mb-4">
                        <div className="flex items-center">
                            <IoChatbubble className="mr-2 text-xl" />
                            <h2 className="text-lg font-semibold">Helpful Articles</h2>
                        </div>
                        <button onClick={closeArticleModal}>
                            <IoMdClose className="text-3xl hover:text-red-600" />
                        </button>
                    </div>
                    <div className="overflow-hidden">
                        <ReadHelpArticle />
                    </div>
                </div>
            </Modal>



        </div>







    </div>

    );
}