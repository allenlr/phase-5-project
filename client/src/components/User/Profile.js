import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Profile(){
    const [editUser, setEditUser] = useState(false)
    const currentUser = useSelector(state => state.user.currentUser)

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