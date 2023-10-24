import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(){
    const currentUser = useSelector(state => state.user.currentUser);
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Home
            </Link>
            <Link to="/services" className="nav-link">
                Services
            </Link>
            {currentUser ? 
                <Link to="/account" className="nav-link">
                    Account
                </Link> 
                :
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            }
        </nav>
    )
}
    

export default Navbar;