import "./User.css"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure, logout } from './userSlice'

function Login(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const [showPassword, setShowPassword] = useState(false);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })

    function handleFormChange(e) {
        const keyName = e.target.name
        setLoginForm({
            ...loginForm, 
            [keyName]: e.target.value
        })
    }

    return(
        <div className="login-div">
            Login
            <br />
            <br />
            <form className="login-form">
                username:
                <input
                    style={{marginLeft: "5px"}}
                    name="username"
                    type="text"
                    value={loginForm.username}
                    onChange={handleFormChange} 
                />
                <br/>
                password:
                <input 
                    style={{marginLeft: "7px"}}
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
                    {showPassword ? "🚫👁️" : "👁️"}
                </button>
            </form>

        </div>
    )
}


export default Login;