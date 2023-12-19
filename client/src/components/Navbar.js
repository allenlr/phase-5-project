import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Account from './User/Account';
import { setError } from './errorSlice';
import { setMessage } from './errorSlice';
import { useDispatch } from 'react-redux';


function Navbar(){
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    function resetCurrentMessages(){
        dispatch(setError(null))
        dispatch(setMessage(null))
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand" onClick={resetCurrentMessages}>
                Home
            </Link>
            <Link to="/services" className="nav-link" onClick={resetCurrentMessages}>
                Search Services
            </Link>
            {currentUser ? 
                <div className="navbar-actions" onClick={resetCurrentMessages}>
                    <Account/>
                    
                </div>
                :
                <Link to="/login" className="nav-link" onClick={resetCurrentMessages}>
                    Login/Register
                </Link>
            }
        </nav>
    )
}
    

export default Navbar;