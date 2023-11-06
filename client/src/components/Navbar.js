import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './User/userSlice'
import Account from './User/Account';

function Navbar(){
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE",
        })
        .then(r => {
            if (r.ok){
                dispatch(logout());
                navigate('/')
            } else {
                throw new Error("Failed to logout")
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

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
                    <Account className="nav-buttons"/>
                    
                </div>
                :
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            }
        </nav>
    )
}
    

export default Navbar;