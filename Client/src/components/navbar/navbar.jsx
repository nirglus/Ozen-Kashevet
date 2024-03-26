import { useContext } from "react";
import { NavLink } from "react-router-dom";
import 'animate.css';
import { UserContext } from "../../managers/userManager";
import { GoSidebarExpand, GoSidebarCollapse } from 'react-icons/go';
import { FaHandHoldingHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export default function Navbar(props) {
    const { logOut, user } = useContext(UserContext);

    const collapseHandler = () => {
        props.setIsCollapsed(!props.isCollapsed);
    };

    return (
        <div>
            <button className="fixed text-3xl pt-6" onClick={collapseHandler}>
                <GoSidebarCollapse />
            </button>
            <nav className={`animate__animated animate__faster w-1/5 h-screen fixed bg-red-500 z-50 ${props.isCollapsed ? 'animate__slideOutLeft' : 'animate__slideInLeft'
                }`}>
                <div className="flex items-center pt-6 mb-8">
                    <span className="flex items-center font-bold pl-4">
                        <FaHandHoldingHeart className="text-3xl mr-2" />Ozen Kashevet
                    </span>
                    <button className="text-3xl ml-auto pr-4" onClick={collapseHandler}>
                        <GoSidebarExpand />
                    </button>
                </div>

                <ul className="h-full text-lg">
                    <NavLink to='/auth'>
                        <li className="flex justify-center hover:bg-red-100">Auth</li>
                    </NavLink>
                    <NavLink to='/chat'>
                        <li className="flex justify-center hover:bg-red-100">Message</li>
                    </NavLink>
                    {user && Object.keys(user).length > 0 && (
                        <div>
                            <NavLink to='/dashboard'>
                                <li className="flex justify-center hover:bg-red-100">Dashboard</li>
                            </NavLink>
                        </div>
                    )}
                    {user && Object.keys(user).length > 0 && (
                        <div className="fixed bottom-0 mb-10 pl-4">
                            <button onClick={logOut} className="flex items-center">
                                <CiLogout className="text-3xl" />
                                <span className="ml-2">LogOut</span>
                            </button>
                        </div>
                    )}
                </ul>
            </nav>
        </div>
    );
}
