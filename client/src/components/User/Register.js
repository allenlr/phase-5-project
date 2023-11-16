import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateUser } from './userSlice';
import { setError } from '../errorSlice';

function Register(){
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false)
    const [signupForm, setSignupForm] = useState({
        username: '',
        email: '',
        location: '',
        password: '',
        password_confirmation: '',

    })
    const navigate = useNavigate();

    function isValidZipCode(zip){
        const zipCodePattern = /^\d{5}(-\d{4})?$/;
        return zipCodePattern.test(zip)
    }

    function handleFormChange(name, value){
        setSignupForm({
            ...signupForm,
            [name]: value
        })
    }

    function handleRegisterSubmit(e){
        e.preventDefault();

        if(signupForm.location && !isValidZipCode(signupForm.location)){
            dispatch(setError("Invalid ZIP code format"));
            return
        }

        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupForm)
        })
            .then(response => {
                if (!response.ok){
                    return response.json().then(data => {
                        throw new Error(data.errors.join(', ') || "Failed to create user")
                    })
                } else {
                    return response.json()
                }
            })
            .then((newUser) => {
                dispatch(updateUser(newUser));
                dispatch(setError(null))
                navigate('/')
                console.log(newUser)
            })
            .catch((error) => {
                dispatch(setError(error.message))
            })
    }

    return(
        <div 
            className="register-div"
            style={{marginLeft: "90px"}}
        >
            
                <div className="menu-description" id="register-description">
                    <h2>User Information</h2>
                    <p>Enter new user information</p>
                </div>
                <form id="registration-form" onSubmit={handleRegisterSubmit}>
                    <div className="register-container">
                        <div className="input-group">
                            <label>
                                Username
                            </label>
                            <input 
                                type="text" 
                                name="username" 
                                value={signupForm.username} 
                                onChange={(e) => handleFormChange(e.target.name, e.target.value)}>
                            </input>
                        </div>
                        <div className="input-group">
                            <label>
                                Email
                            </label>
                            <input 
                                type="text" 
                                name="email" 
                                value={signupForm.email} 
                                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="input-group">
                            <label>
                                Password
                            </label>
                            <div className="input-button-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    value={signupForm.password} 
                                    onChange={(e) => handleFormChange(e.target.name, e.target.value)}>
                                </input>
                                <button
                                    className="hide-show-password-buttons"
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div> 
                        </div>
                        <div className="input-group" id="last-register-input">
                            <label>
                                Confirm Password
                            </label>
                            <div className="input-button-wrapper">
                                <input 
                                    type={showPasswordConf ? "text" : "password"} 
                                    name="password_confirmation" 
                                    value={signupForm.password_confirmation} 
                                    onChange={(e) => handleFormChange(e.target.name, e.target.value)}>
                                </input>
                                <button
                                    className="hide-show-password-buttons"
                                    type="button"
                                    onClick={() => setShowPasswordConf((prev) => !prev)}
                                >
                                    {showPasswordConf ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div> 
                        </div>
                        <div className="input-group">
                            <label>
                                Location (zip) - optional
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={signupForm.location}
                                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                            >
                            </input>
                        </div>
                    </div>
                    <button type="submit" id="registration-submit-button">Sign Up</button>
                </form>
            
        </div>
    )
}


export default Register;