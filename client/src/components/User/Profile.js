import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Profile(){
    const [editUser, setEditUser] = useState(false)
    const currentUser = useSelector(state => state.user.currentUser)

    return (
        <div className="profile-div">
            <div className="menu-description">
                <h2>Profile Information</h2>
                <p>Change User Info</p>
            </div>
                <div>
                    <form id="edit-user-form">
                        <div className="profile-container">
                            <div className="input-group" id="first-group">
                                <label>
                                    Username
                                </label>
                                <input type="text"></input>
                            </div>
                            <div className="input-group">
                                <label>
                                    Email
                                </label>
                                <input type="text"></input>
                            </div>
                            <div className="input-group" id="last-group">
                                <label>
                                    Current Password
                                </label>
                                <input type="password"></input>  
                            </div>
                            
                        </div>
                        <button id="save-changes-button">Save</button>
                    </form>
                </div>
        </div>
    )
}

export default Profile;