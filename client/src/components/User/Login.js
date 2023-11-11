import "./User.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginRequest, user } from './userSlice'
import { setError } from '../errorSlice';

function Login(){
    const error = useSelector(state => state.error.currentError)
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate();

    function handleFormChange(e) {
        const keyName = e.target.name
        setLoginForm({
            ...loginForm, 
            [keyName]: e.target.value
        })
    }

    function handleLogin(e) {
        e.preventDefault()

        dispatch(loginRequest());

        fetch("/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginForm)
        })
            .then((r) => {
                if (r.ok){
                    return r.json()
                } else {
                    return r.json().then((data) => {
                        throw new Error(data.error || 'Login Failed')
                    })
                }
            })
            .then((userData) => {
                dispatch(user(userData));
                dispatch(setError(null))
                navigate('/')
            })
            .catch((error) => {
                dispatch(setError(error.message))
            })
    }

    console.log(error)

    return(
        <div className="login-div">
            <h1 id="login-header">
                Login
            </h1>
            <br />
            <br />
            {/* {error && <span id="error-handle">{error}</span>} */}
            <form className="login-form" onSubmit={handleLogin}>
                Username:
                <input
                    style={{marginLeft: "5px"}}
                    name="username"
                    type="text"
                    value={loginForm.username}
                    onChange={handleFormChange} 
                />
                <br/>
                <div className="login-input-button-wrapper">
                    Password:
                    <input 
                        style={{marginLeft: "10px"}}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={loginForm.password}
                        onChange={handleFormChange}
                    />
                    <button 
                        id="login-hide-show-button"
                        className="hide-show-password-buttons"
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <br/>
                <br/>
                <button type="submit" id="login-button">Login</button>
            </form>

        </div>
    )
}


export default Login;