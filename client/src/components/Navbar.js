import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Account from './User/Account';


function Navbar(){
    const currentUser = useSelector(state => state.user.currentUser);


    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Home
            </Link>
            <Link to="/services" className="nav-link">
                Search Services
            </Link>
            {currentUser ? 
                <div className="navbar-actions">
                    <Account/>
                    
                </div>
                :
                <Link to="/login" className="nav-link">
                    Login/Register
                </Link>
            }
        </nav>
    )
}
    

export default Navbar;