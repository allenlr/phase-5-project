import React, { useState } from 'react'
import './Services.css'
import { useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Reviews({reviews, providerId}){
    
    const currentUser = useSelector(state => state.user.currentUser)
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [editing, setEditing] = useState(false)

    function handlePostReview(reviewId) {
        fetch(`service_providers/${providerId}/reviews/${reviewId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify("")
        })
        .then(r => {
            if(!r.ok){
                return r.json().then(data => {
                    throw new Error(data.error || "Unknown error");
                })
            } else {
                return r.json();
            }
        })
        .then((comment) => {
            console.log(comment)
        })
        .catch(error => {
            setError(error.message)
        })
    }

    function handleEditClick(comment) {
        setEditing((prevState) => !prevState)
    }

    return(
        <div>
            <h4 className="provider-reviews-header">{`Reviews (${reviews.length})`}</h4>
            {reviews.map((review) => {
                return (
                    <div key={review.id} className="comment-container">
                        <div className="success-or-error-messages">
                            {showSuccessMessage && <div style={{ color: 'rgb(0, 83, 94)' }}>Comment Updated</div>}
                            {error && <div style={{ color: 'rgb(255, 70, 70)' }}>{error}</div>}
                        </div>
                        <div className="comment-header">
                            <span className="review-user">{review.username}</span>
                            <span className="comment-timestamp">{review.date}</span>
                        </div>
                        <div className="edit-delete-comment-wrapper">
                            <div className="comment-text">
                                {editing ? 
                                <div>
                                    <textarea id="comment-edit-box" value={comment}> </textarea>
                                        {/* {renderStars()} */}
                                        {error ? <span style={{color: "red"}}>{error}</span> : null}
                                        <button>Save</button>
                                        <button>Cancel</button>
                                </div>
                                : 
                                    <p>{review.comment}</p>
                                }
                            </div>
                            {review.user_id === currentUser?.id &&
                                <div>
                                    <span className="comment-edit" onClick={() => handleEditClick(review.comment)}><FaEdit /></span>
                                    <span className="comment-delete"><FaTrashAlt /></span>
                                </div>
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Reviews;