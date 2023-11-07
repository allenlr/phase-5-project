import React, { useState } from 'react'
import './Services.css'
import { useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function ServiceProvider({provider}){
    const [showDetails, setShowDetails] = useState(false)

    const reviews = Array.isArray(provider.reviews) ? provider.reviews : [];
    console.log(reviews)
    const currentUser = useSelector(state => state.user.currentUser)

    return(
        <div>
            <h3 className='provider-names' onClick={() => setShowDetails((prev) => !prev)}>
                {provider.business_name}
            </h3>
            <p className='provider-descriptions'>
                {provider.description}
            </p>
            {showDetails && (
                <div>
                    <h4 className="provider-reviews-header">{`Reviews (${reviews.length})`}</h4>
                    {reviews.map((review) => {
                        return (
                            <div key={review.id} className="comment-container">
                                <div className="comment-header">
                                    <span className="review-user">{review.username}</span>
                                    <span className="comment-timestamp">{review.date}</span>
                                </div>
                                <div className="edit-delete-comment-wrapper">
                                    <div className="comment-text">
                                        <p>{review.comment}</p>
                                    </div>
                                    {review.user_id === currentUser?.id ? 
                                        <div>
                                            <span className="comment-edit"><FaEdit /></span>
                                            <span className="comment-delete"><FaTrashAlt /></span>
                                        </div>
                                    :
                                        null
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default ServiceProvider;