import "./User.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginRequest, loginSuccess, loginFailure } from './userSlice'

function Login(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const [showPassword, setShowPassword] = useState(false);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState(null)
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
                dispatch(loginSuccess(userData));
                setError(null)
                navigate('/')
            })
            .catch((error) => {
                dispatch(loginFailure(error.message))
                setError(error)
                console.log(`error: ${error.message}`)
            })
    }

    console.log(currentUser)

    return(
        <div className="login-div">
            <h1 id="login-header">
                Login
            </h1>
            <br />
            <br />
            <span id="error-handle">{error ? error.message : null}</span>
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
                Password:
                <input 
                    style={{marginLeft: "10px"}}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={handleFormChange}
                />
                <button 
                    style={{fontSize: "10px", marginLeft:"5px"}} 
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <br/>
                <br/>
                <button type="submit" id="login-button">Login</button>
            </form>

        </div>
    )
}


export default Login;