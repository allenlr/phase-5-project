import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from './userSlice';

function Profile(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [userForm, setUserForm] = useState({
        username: currentUser.username,
        email: currentUser.email,
        currentPassword: "",
        password: ""
    })

    function handleFormChanges(e){
        const { name, value }= e.target
        setUserForm({
            ...userForm,
            [name]: value
        })
    }

    function handleUserChangesSubmit(e){
        e.preventDefault();
        setError(null);

        const user = {
            username: userForm.username,
            email: userForm.email,
            currentPassword: userForm.currentPassword,
            password: userForm.password
        }

        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error("Incorrect password or unauthorized access")
                    } else {
                        return res.json().then(data => {
                            throw new Error(data.error || "Unknown error");
                        })
                    }
                }
                return res.json();
            })
            .then(data => {
                dispatch(loginSuccess(data))
                setShowSuccessMessage(true)
            })
            .catch(error => {
                setError(error.message)
            })

    }

    console.log(currentUser)
    return (
        <div className="profile-div">
            <div className="profile-information-div">
                <div className="menu-description">
                    <h2>Profile Information</h2>
                    <p>Change User Info</p>
                </div>
                <div>
                    <div className="success-or-error-messages">
                        {showSuccessMessage && <div style={{ color: 'rgb(0, 83, 94)' }}>Changes Saved</div>}
                        {error && <div style={{ color: 'rgb(255, 70, 70)' }}>Error: {error}</div>}
                    </div>
                    <form id="edit-user-form" onSubmit={handleUserChangesSubmit}>
                        <div className="profile-container">
                            <div className="input-group">
                                <label>
                                    Username
                                </label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={userForm.username} 
                                    onChange={(e) => handleFormChanges(e)}>
                                </input>
                            </div>
                            <div className="input-group">
                                <label>
                                    Email
                                </label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={userForm.email} 
                                    onChange={(e) => handleFormChanges(e)}>
                                </input>
                            </div>
                            <div className="input-group">
                                <label>
                                    Current Password
                                </label>
                                <div className="input-button-wrapper">
                                    <input 
                                        type={showCurrentPassword ? "text" : "password"} 
                                        name="currentPassword" 
                                        value={userForm.currentPassword} 
                                        onChange={(e) => handleFormChanges(e)}>
                                    </input>
                                    <button
                                        className="hide-show-password-buttons"
                                        type="button"
                                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                                    >
                                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div> 
                            </div>
                            <div className="input-group">
                                <label>
                                    New Password
                                </label>
                                <div className="input-button-wrapper">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" value={userForm.password} 
                                        onChange={(e) => handleFormChanges(e)}>
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
                        <button type="submit" id="save-changes-button">Save</button>
                    </form>
                </div>
            </div>
            <div className="profile-reviews-div">
                <div className="menu-description">
                    <h2>User Reviews</h2>
                    <p>View and Edit Reviews</p>
                </div>
                <div>
                    <div className="profile-reviews-container">
                        <div className="profile-container">
                            {currentUser.reviews.map((review) => {
                                return (
                                    <div key={review.id} className="profile-review">
                                        <div className="comment-header">
                                            <span >{review.provider} Review</span>
                                            <span className="comment-timestamp">{review.date}</span>
                                        </div>
                                        <div className="comment-text">
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;