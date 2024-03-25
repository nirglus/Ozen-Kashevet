import { useContext } from "react";
import { NavLink } from "react-router-dom";
import 'animate.css';
import { UserContext } from "../../managers/userManager";

export default function Navbar(props) {
    const { logOut, user } = useContext(UserContext);

    const collapseHandler = () => {
        props.setIsCollapsed(!props.isCollapsed);
    };

    return (
        <div>
            <button className="fixed" onClick={collapseHandler}>
                {props.isCollapsed ? 'open sidebar' : 'close sidebar'}
            </button>
            <nav className={`animate__animated animate__faster w-1/5 h-screen fixed bg-red-500 z-50 ${props.isCollapsed ? 'animate__slideOutLeft' : 'animate__slideInLeft'
                }`}>
                <button onClick={collapseHandler}>close sidebar</button>
                <ul>
                    <NavLink to='/auth'>
                        <li>Auth</li>
                    </NavLink>
                    <NavLink to='/chat'>
                        <li>Message</li>
                    </NavLink>
                    {user && Object.keys(user).length > 0 && (
                        <>
                            <NavLink to='/dashboard'>
                                <li>Dashboard</li>
                            </NavLink>
                            <button onClick={logOut}>Log Out</button>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
