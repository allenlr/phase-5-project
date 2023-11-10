import React, { useState } from 'react'
import './Services.css'
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { loginSuccess } from '../User/userSlice';
import { setServiceProviders } from './serviceProvidersSlice';
import { setError } from '../errorSlice';

function Review({setReviewsList, reviewsList, review, providerId, onDelete, renderStars, renderEditableStars}){
    
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const error = useSelector(state => state.error.currentError)
    const serviceProviders = useSelector(state => state.serviceProviders.providers)
    const [comment, setComment] = useState(review?.comment);
    // const [error, setError] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [editing, setEditing] = useState(false)
    const [rating, setRating] = useState(review.rating)
    

    function handleEditClick() {
        setEditing((prevState) => !prevState)
    }

    function handleEditCancel(){
        setEditing(false)
        setComment(review.comment)
        setRating(5)
    }

    function handleSaveComment(){
        fetch(`/service_providers/${providerId}/reviews/${review?.id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({comment, rating})
        })
        .then(response => {
            if(!response.ok){
                return response.json().then(errorJson => {
                    throw new Error(errorJson.errors.join(", ") || "Failed to update comment");
                });
            } else {
                return response.json();
            }
        })
        .then((updatedReview) => {
            dispatch(loginSuccess({
                ...currentUser,
                reviews: currentUser.reviews.map((item) => {
                    if (item.id === updatedReview.id){
                        return updatedReview;
                    } else{
                        return item;
                    }
                })
            }));

            const updatedProviders = serviceProviders?.map((provider) => {
                if (provider.id === providerId) {
                    return {
                        ...provider,
                        reviews: provider.reviews.map((rev) => {
                            if (rev.id === updatedReview.id) {
                                return updatedReview;
                            } else {
                                return rev;
                            }
                        })
                    }
                } else {
                    return provider
                }
            })
            dispatch(setServiceProviders(updatedProviders));

            setReviewsList(reviewsList.map((item) => {
                if(review.id === item.id){
                    return updatedReview
                } else {
                    return item
                }
            }))
            setShowSuccessMessage(true)
            dispatch(setError(null))
            setEditing(false)
        })
        .catch(error => {
            dispatch(setError(error.message))
        });
    }

    

    function handleReviewDelete() {
        fetch(`/service_providers/${providerId}/reviews/${review.id}`, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((r) => {
            if(r.ok) {
                onDelete(review.id)
            }
        })
        .catch((error) => dispatch(setError(error.message)))
    }

    return(
        <div className="comment-container">
            <div className="success-or-error-messages">
                {showSuccessMessage && <div style={{ color: 'rgb(0, 250, 250)' }}>Comment Updated</div>}
            </div>
            <div className="comment-header">
                <span className="review-user">{review?.username}</span>
                <span className="comment-timestamp">{review?.date}</span>
            </div>
            <div className="edit-delete-comment-wrapper">
                <div className="comment-text">
                
                    {editing ? 
                    <div className="text-area-button-wrapper">
                        <textarea id="comment-edit-box" value={comment} onChange={(e) => setComment(e.target.value)}> </textarea>
                        <span className="star-span">
                            <span className="star-editing-div">
                                {renderEditableStars(rating, setRating)}
                            </span>
                        </span>
                            <div className="save-cancel-wrapper">
                                <button className="save-cancel-edit-buttons" onClick={handleSaveComment}>Save</button>
                                <button className="save-cancel-edit-buttons" onClick={handleEditCancel}>Cancel</button>
                            </div>
                    </div>
                    : 
                    <div className="comment-star-wrapper">
                        <p>{review?.comment}</p>
                        
                        <span className="star-span">
                            {renderStars(review.rating)}
                        </span>
                    </div>
                    }
                </div>
                {review?.user_id === currentUser?.id &&
                    <div>
                        <span className="comment-edit" onClick={handleEditClick}><FaEdit /></span>
                        <span className="comment-delete" onClick={handleReviewDelete}><FaTrashAlt /></span>
                    </div>
                }
            </div>
        </div>
    );
}


export default Review;