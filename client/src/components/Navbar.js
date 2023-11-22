import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Account from './User/Account';
import { setError } from './errorSlice';
import { useDispatch } from 'react-redux';


function Navbar(){
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();


    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand" onClick={() => dispatch(setError(null))}>
                Home
            </Link>
            <Link to="/services" className="nav-link" onClick={() => dispatch(setError(null))}>
                Search Services
            </Link>
            {currentUser ? 
                <div className="navbar-actions" onClick={() => dispatch(setError(null))}>
                    <Account/>
                    
                </div>
                :
                <Link to="/login" className="nav-link" onClick={() => dispatch(setError(null))}>
                    Login/Register
                </Link>
            }
        </nav>
    )
}
    

export default Navbar;