import '../Services/Services.css'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updateUser, logout } from './userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProvider } from '../Services/serviceProvidersSlice';
import { setSelectedServiceType } from '../Services/serviceTypesSlice';
import { useNavigate } from 'react-router-dom';
import { setError } from '../errorSlice';
import { Button, Modal } from 'react-bootstrap';
import '../../custom-bootstrap.scss';




function Profile(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user?.currentUser)
    const loading = useSelector(state => state.user.loading)
    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [userForm, setUserForm] = useState({
        username: currentUser?.username,
        email: currentUser?.email,
        currentPassword: "",
        password: ""
    })

    useEffect(() => {
        if (!currentUser && loading){
            navigate('/')
        }
    }, [currentUser])

    function handleFormChanges(name, value) {
        setUserForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    function handleUserChangesSubmit(e){
        e.preventDefault();
        dispatch(setError(null));

        const user = {
            username: userForm.username,
            email: userForm.email,
            currentPassword: userForm.currentPassword,
            password: userForm.password
        }

        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            credentials: 'include',
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
                } else{
                    return res.json();
                }
            })
            .then(data => {
                dispatch(updateUser(data))
                setShowSuccessMessage(true)
                dispatch(setError(null))
            })
            .catch(error => {
                dispatch(setError(error.message))
            })

    }

    function handleUserDelete(){
        fetch(`/users/${currentUser.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ currentPassword: userForm.currentPassword }),
            credentials: 'include'
        })
        .then(r => {
            if(!r.ok){
                return r.json().then(data => {
                    throw new Error(data.error)
                })
            } else {
                dispatch(logout())
                navigate('/')
            }
        })
        .catch(error => {
            dispatch(setError(error.message))
        })
    }


    function handleServiceProviderClick(serviceProviderId) {
        fetch(`/users/${currentUser.id}/service_providers/${serviceProviderId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            return response.json();
          })
          .then(data => {
            dispatch(setSelectedServiceType(null))
            dispatch(setSelectedProvider([data]));
            navigate(`/service_providers`);
            dispatch(setError(null))
          })
          .catch(error => {
            dispatch(setError(error.message));
          });
    }

    const getStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= rating; i++) {
            stars.push(
                <span key={i} className="star">
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="profile-div">
            <div className="profile-information-div">
                <div className="menu-description">
                    <h2>Profile Information</h2>
                    <p>Change User Info</p>
                </div>
                <div>
                    <div className="success-or-error-messages">
                        {showSuccessMessage && <div style={{ color: 'rgb(0, 120, 0)', marginLeft: "30px" }}>Changes Saved</div>}
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
                        <Button variant="danger" id="delete-account-button" onClick={() => setShowConfirmDialog(true)}>
                            Delete Account
                        </Button>

                            <Modal show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)}>
                                <Modal.Body>Are you sure you want to delete your account? This action cannot be undone.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowConfirmDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleUserDelete}>
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </Modal>
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
                            {currentUser && currentUser?.reviews && currentUser?.reviews?.map((review) => {
                                return (
                                    <div key={review.id} className="profile-review">
                                        <div className="comment-header">
                                            <span to="/service_providers" className='service-names' onClick={() => handleServiceProviderClick(review.service_provider.id)}>
                                                {review.service_provider.business_name} Review
                                            </span>
                                            <span className="comment-timestamp" style={{marginTop: '17px'}}>{review.date}</span>
                                        </div>
                                            <div className="comment-star-wrapper">
                                                    <p>{review.comment}</p>
                                                
                                                    <span className="star-span">{getStars(review.rating)}</span>
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