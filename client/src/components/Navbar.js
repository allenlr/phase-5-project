import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './User/userSlice'

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
                Services
            </Link>
            {currentUser ? 
                <div className="navbar-actions">
                    <Link to="/account" className="nav-link">
                        Account
                    </Link>
                    <button id="logout-button" onClick={handleLogout}>Logout</button>
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