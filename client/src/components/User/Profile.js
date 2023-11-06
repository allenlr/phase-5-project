import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from './userSlice';
import { setServiceProviders, setSelectedProvider } from '../Services/serviceProvidersSlice';
import { setSelectedServiceType } from '../Services/serviceTypesSlice';
import { useNavigate } from 'react-router-dom';

function Profile(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const serviceProviders = useSelector(state => state.serviceProviders.providers)
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

    function handleFormChanges(name, value) {
        setUserForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
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


    function handleServiceProviderClick(serviceProviderId) {
        fetch(`/users/${currentUser.id}/service_providers/${serviceProviderId}`)
          .then(response => {
            console.log("response status:", response.status)
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            return response.json();
          })
          .then(data => {
            dispatch(setSelectedServiceType(null))
            dispatch(setSelectedProvider([data]));
            navigate(`/service_providers`);
          })
          .catch(error => {
            setError(`Fetch error: ${error.message}`);
          });
    }

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
                        {error && <div style={{ color: 'rgb(255, 70, 70)' }}>{error}</div>}
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
                                    onChange={(e) => handleFormChanges(e.target.name, e.target.value)}>
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
                                    onChange={(e) => handleFormChanges(e.target.name, e.target.value)}>
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
                                        onChange={(e) => handleFormChanges(e.target.name, e.target.value)}>
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
                                        onChange={(e) => handleFormChanges(e.target.name, e.target.value)}>
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
                            {currentUser && currentUser.reviews && currentUser.reviews.map((review) => {
                                return (
                                    <div key={review.id} className="profile-review">
                                        <div className="comment-header">
                                            <span to="/service_providers" className='service-names' onClick={() => handleServiceProviderClick(review.service_provider.id)}>
                                                {review.service_provider.business_name} Review
                                            </span>
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