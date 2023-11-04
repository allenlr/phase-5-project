import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/hooks/useSelector';

function Profile(){
    const [editUser, setEditUser] = useState(false)
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const [error, setError] = useState(null);
    const [userForm, setUserForm] = useState({
        username: currentUser.username,
        email: currentUser.email,
        currentPassword: currentUser.password,
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
                setCurrentUser(data);
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
                    <form id="edit-user-form">
                        <div className="profile-container">
                            <div className="input-group" id="first-group">
                                <label>
                                    Username
                                </label>
                                <input type="text" name="username" value={userForm.username} onChange={(e) => handleFormChanges(e)}></input>
                            </div>
                            <div className="input-group">
                                <label>
                                    Email
                                </label>
                                <input type="text" name="email" value={userForm.email} onChange={(e) => handleFormChanges(e)}></input>
                            </div>
                            <div className="input-group">
                                <label>
                                    Current Password
                                </label>
                                <input type="password" name="currentPassword" value={userForm.currentPassword} onChange={(e) => handleFormChanges(e)}></input>  
                            </div>
                            <div className="input-group" id="last-group">
                                <label>
                                    New Password
                                </label>
                                <input type="password" name="newPassword" value={userForm.password} onChange={(e) => handleFormChanges(e)}></input>  
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