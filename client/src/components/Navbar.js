import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar(){
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Home
            </Link>
            <Link to="/services" className="nav-link">
                Services
            </Link>
            <Link to="/account" className="nav-link">
                Account
            </Link>
        </nav>
    )
}
    

export default Navbar;