import "./User.css"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure, logout } from './userSlice'

function Login(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <br/>
                password:
                <input 
                    style={{marginLeft: "7px"}}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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