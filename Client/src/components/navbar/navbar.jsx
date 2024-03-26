import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import 'animate.css';
import { UserContext } from "../../managers/userManager";
import { GoSidebarExpand, GoSidebarCollapse } from 'react-icons/go';
import { FaHandHoldingHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export default function Navbar(props) {
    const { logOut, user ,userIn} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const collapseHandler = () => {
        props.setIsCollapsed(!props.isCollapsed);
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className={!isOpen ? "fixed text-3xl pt-80" : "hidden"} onClick={collapseHandler}>
                <GoSidebarCollapse />
            </button>
            <nav className={`animate__animated animate__faster w-1/5 h-screen fixed bg-blue-300 bg-opacity-90 z-50 ${props.isCollapsed ? 'animate__slideOutLeft' : 'animate__slideInLeft'
                }`}>
                <div className="flex items-center pt-6 mb-8">
                    <span className="flex items-center font-bold pl-4">
                        <FaHandHoldingHeart className="text-3xl mr-2" />Ozen Kashevet
                    </span>
                    <button className="text-3xl ml-auto pr-4" onClick={collapseHandler}>
                        <GoSidebarExpand />
                    </button>
                </div>

                <ul className=" text-lg flex flex-col justify-center ">
                  {!userIn ? (
                    <NavLink to="/" className="w-full">
                      <li className="flex justify-center items-center hover:bg-red-100 cursor-pointer w-full py-2 px-4">
                        Auth
                      </li>
                    </NavLink>
                  ) : (
                    <>
                      <NavLink to="/chat" className="w-full">
                        <li className="flex justify-center items-center hover:bg-red-100 cursor-pointer w-full py-2 px-4">
                          Message
                        </li>
                      </NavLink>
                      <NavLink to="/" className="w-full">
                        <li className="flex justify-center items-center hover:bg-red-100 cursor-pointer w-full py-2 px-4">
                          Dashboard
                        </li>
                      </NavLink>
                      <button onClick={logOut} className="flex items-center justify-center w-full py-2 px-4">
                        <CiLogout className="text-3xl" />
                        <span className="ml-2">LogOut</span>
                      </button>
                    </>
                  )}
                </ul>
            </nav>
        </div>
    );
}
