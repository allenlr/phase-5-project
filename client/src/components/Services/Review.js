import React, { useState } from 'react'
import './Services.css'
import { useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Review({setReviewsList, reviewsList, review, providerId}){
    
    const currentUser = useSelector(state => state.user.currentUser)
    const [comment, setComment] = useState(review?.comment);
    const [error, setError] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [editing, setEditing] = useState(false)

    function handleEditClick() {
        setEditing((prevState) => !prevState)
    }

    function handleEditCancel(){
        setEditing(false)
        setComment(review.comment)
    }

    function handleSaveComment(){
        fetch(`/service_providers/${providerId}/reviews/${review?.id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({comment})
        })
        .then(r => {
            if(!r.ok){
                throw new Error("Failed to update comment")
            } else {
                return r.json()
            }
        })
        .then((updatedComment) => {
            setReviewsList(reviewsList.map((item) => {
                if(review?.id === item.id){
                    return updatedComment
                } else {
                    return item
                }
            }))
            setShowSuccessMessage(true)
            setError(null)
            setEditing(false)
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return(
        <div className="comment-container">
            <div className="success-or-error-messages">
                {showSuccessMessage && <div style={{ color: 'rgb(0, 250, 250)' }}>Comment Updated</div>}
                {error && <div style={{ color: 'rgb(255, 70, 70)' }}>{error}</div>}
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
                            {/* {renderStars()} */}
                            <div className="save-cancel-wrapper">
                                <button className="save-cancel-edit-buttons" onClick={handleSaveComment}>Save</button>
                                <button className="save-cancel-edit-buttons" onClick={handleEditCancel}>Cancel</button>
                            </div>
                    </div>
                    : 
                        <p>{review?.comment}</p>
                    }
                </div>
                {review?.user_id === currentUser?.id &&
                    <div>
                        <span className="comment-edit" onClick={handleEditClick}><FaEdit /></span>
                        <span className="comment-delete"><FaTrashAlt /></span>
                    </div>
                }
            </div>
        </div>
    );
}


export default Review;