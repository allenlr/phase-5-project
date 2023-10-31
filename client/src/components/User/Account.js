import "./User.css"
import React, { useState, useRef, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from './userSlice'

function Account(){
    const dropdownRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        function handleClickOutside(e){
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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

    return(
        <div ref={dropdownRef}>
            <button className="nav-link" onClick={toggleDropdown}>Account</button>
            {isOpen && (
                <div className="account-dropdown">
                    <ul className='dropdown-links'>
                        <li className='dropdown-links'><a href="/profile">Profile</a></li>
                        <li className='dropdown-links'><a href="/settings">Settings</a></li>
                        <li className='dropdown-links'><a href="/logout" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Account;