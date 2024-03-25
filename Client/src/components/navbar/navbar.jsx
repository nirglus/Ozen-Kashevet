import { useState } from "react"
import { NavLink } from "react-router-dom"
import 'animate.css';

export default function Navbar(props) {

    const collapseHandler = () => {
        props.setIsCollapsed(!props.isCollapsed)

    }

    if (props.isCollapsed === false) {

        return (<nav className="animate__animated animate__slideInLeft animate__faster w-1/5 h-screen fixed bg-red-500 z-50">
            <button onClick={collapseHandler}>close sidebar</button>
            <ul>
                <NavLink to='/auth'>
                    <li>Auth</li>
                </NavLink>
                <NavLink to='/chat'>
                    <li>Message</li>
                </NavLink>
                <NavLink to='/dashboard'>
                    <li>Dashboard</li>
                </NavLink>
            </ul>

        </nav>)
    }

    return (<div>
        <button className="fixed" onClick={collapseHandler}>open sidebar</button>
        <nav className="animate__animated animate__slideOutLeft animate__faster w-1/5 h-screen fixed bg-red-500 z-50  ">
            <button onClick={collapseHandler}>close sidebar</button>
            <ul>
                <NavLink to='/auth'>
                    <li>Auth</li>
                </NavLink>
                <NavLink to='/chat'>
                    <li>Message</li>
                </NavLink>
            </ul>

        </nav>

    </div>
    )


}

