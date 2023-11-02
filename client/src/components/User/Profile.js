import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Profile(){
    const currentUser = useSelector(state => state.user.currentUser)
    return (
        <div className="profile-container">
            <div className="input-group">
                <label>
                    Username
                    <input type="text"></input>
                </label>
            </div>
            <div className="input-group">
                <label>
                    Email
                    <input></input>
                </label>
            </div>
            <div className="input-group">
                <label>
                    Password
                    <input type="password"></input>    
                </label>
            </div>
            
        </div>
    )
}

export default Profile;