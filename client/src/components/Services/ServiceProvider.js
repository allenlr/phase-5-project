import './Services.css'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Review from './Review';

function ServiceProvider({provider}){
    // const reviews = Array.isArray(provider.reviews) ? provider.reviews : [];
    const [reviews, setReviews] = useState(provider.reviews || [])
    const [showDetails, setShowDetails] = useState(false)
    const currentUser = useSelector(state => state.user.currentUser)
    const [newReview, setNewReview] = useState("")
    const [writeReview, setWriteReview] = useState(false)

    function handleReviewCancel(){
        setNewReview("")
        setWriteReview(false)
    }

    function handleReviewPost(){
        fetch(`/service_providers/${provider.id}/reviews`)
    }

    return(
        <div>
            <div className="provider-name-rating-wrapper">
                <h3 className='provider-names' onClick={() => setShowDetails((prev) => !prev)}>
                    {provider.business_name}
                </h3>
                <h4 className="provider-rating">({provider.avg_rating})</h4>
            </div>
            <p className='provider-descriptions'>
                {provider.description}
            </p>
            
            {showDetails && (
                <div>
                    <h4 className="provider-reviews-header">{`Reviews (${reviews.length})`}</h4>
                    <button className="write-review-button" onClick={() => setWriteReview((prevValue) => !prevValue)}>Write Review</button>
                    {currentUser && writeReview && (
                        <div>
                            <textarea placeholder="type review..." value={newReview} onChange={(e) => setNewReview(e.target.value)}></textarea>
                            <div className="save-cancel-wrapper">
                                    <button className="save-cancel-edit-buttons">Post</button>
                                    <button className="save-cancel-edit-buttons" onClick={handleReviewCancel}>Cancel</button>
                            </div>
                        </div>
                    )}
                    {reviews.map((review) => {
                        return (
                            <Review key={review?.id} review={review} reviewsList={reviews} providerId={provider?.id} setReviewsList={setReviews}/>
                    )}
                    )}
                </div>
            )}
        </div>
    )
}

export default ServiceProvider;