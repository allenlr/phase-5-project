import React, { useState, useEffect } from 'react'
import "./Register.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Register(){
    const error = useSelector(state => state.error.currentError)
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [signupForm, setSignupForm] = useState({
        username: '',
        email: '',
        location: '',
        password: '',
        password_confirmation: '',

    })
    const navigate = useNavigate();

    function handleFormChange(name, value){
        setSignupForm({
            ...signupForm,
            [name]: value
        })
    }

    function handleRegisterSubmit(){

    }

    return(
        <div className="register-div">
            <div>
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
                                onChange={(e) => handleFormChange(e.target.name, e.target.value)}>
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
                    </div>
                    <button type="submit" id="registration-submit-button">Sign Up</button>
                </form>
            </div>
        </div>
    )
}


export default Register;