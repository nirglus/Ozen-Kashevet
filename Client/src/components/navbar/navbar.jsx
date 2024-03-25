import { useContext } from "react";
import { NavLink } from "react-router-dom";
import 'animate.css';
import { UserContext } from "../../managers/userManager";
import { GoSidebarExpand, GoSidebarCollapse } from 'react-icons/go'

export default function Navbar(props) {
    const { logOut, user } = useContext(UserContext);

    const collapseHandler = () => {
        props.setIsCollapsed(!props.isCollapsed);
    };

    return (
        <div>
            <button className="fixed text-3xl" onClick={collapseHandler}>
                <GoSidebarCollapse />
            </button>
            <nav className={`animate__animated animate__faster w-1/5 h-screen fixed bg-red-500 z-50 ${props.isCollapsed ? 'animate__slideOutLeft' : 'animate__slideInLeft'
                }`}>
                <button className="flex justify-end w-full text-3xl pr-2" onClick={collapseHandler}><GoSidebarExpand /></button>
                <ul>
                    <NavLink to='/auth'>
                        <li className="flex justify-center">Auth</li>
                    </NavLink>
                    <NavLink to='/chat'>
                        <li className="flex justify-center">Message</li>
                    </NavLink>
                    {user && Object.keys(user).length > 0 && (
                        <>
                            <NavLink to='/dashboard'>
                                <li className="flex justify-center">Dashboard</li>
                            </NavLink>
                            <button className="flex justify-center w-full mt-auto" onClick={logOut}>Log Out</button>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
