import React from "react";
import { NavLink, Outlet } from "react-router-dom"
import "./style.css"

const NavBar = () => {
    const username = localStorage.getItem("username")

    const activeStyle = {
        textDecoration: "underline",
        color: "blue"
    }

    const navA = ({ isActive }) => (isActive ? activeStyle : undefined)

    return (
        <>
            <header>
                <nav>
                    <h2>
                        <NavLink style={navA} to="/">Connectify</NavLink>
                    </h2>
                    <ul className="nav-links">
                        <li><NavLink style={navA} to="/rota">Rota</NavLink></li>
                        <li><NavLink style={navA} to="/wellbeing">Wellbeing</NavLink></li>
                        <li><NavLink style={navA} to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink style={navA} to={`/profile/${username}`}>Profile</NavLink></li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default NavBar
