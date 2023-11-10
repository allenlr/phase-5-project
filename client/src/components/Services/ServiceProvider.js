import './Services.css'
import '../User/User.css'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Review from './Review';
import { setError } from '../errorSlice';

function ServiceProvider({provider}){
    const dispatch = useDispatch();
    const error = useSelector(state => state.error.currentError)
    const [reviews, setReviews] = useState(provider.reviews || [])
    const [showDetails, setShowDetails] = useState(false)
    const currentUser = useSelector(state => state.user.currentUser)
    const [newReview, setNewReview] = useState("")
    const [writeReview, setWriteReview] = useState(false)
    const [newReviewRating, setNewReviewRating] = useState(5);
    // const [error, setError] = useState([])
    const [averageRating, setAverageRating] = useState(provider.avg_rating)

    useEffect(() => {
        console.log(reviews);
      }, [reviews]);

    function handleReviewCancel(){
        setNewReview("")
        setWriteReview(false)
        setNewReviewRating(5)
    }

    async function handleReviewPost() {
        try {
            const response = await fetch(`/service_providers/${provider.id}/reviews`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    comment: newReview, 
                    rating: newReviewRating,
                    user_id: currentUser?.id
                })
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors);
            }
        
            const newReviewData = await response.json();
            const reviewWithUser = { ...newReviewData.review, username: newReviewData.username };
            
            setReviews(prevReviews => [...prevReviews, reviewWithUser]);

            setAverageRating(newReviewData.new_avg_rating);
            setWriteReview(false);
            setNewReview("");
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.message));
        }
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

    // const handleStarClick = (selectedRating) => {
    //     setNewReviewRating(selectedRating)
    // }

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span 
                    key={i} 
                    className="star" 
                >
                    {i <= rating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    };

    const renderEditableStars = (rating, onRatingChange) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span 
                    key={i} 
                    className="star" 
                    onClick={() => onRatingChange(i)}
                >
                    {i <= rating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    };

    function handleDeleteReview(reviewId){
        setReviews((prevReviews) => {
            return prevReviews.filter((review) => review.id !== reviewId)
        })
    }

    return(
        <div>
            
            <div className="provider-name-rating-wrapper">
                <h3 className='provider-names' onClick={() => setShowDetails((prev) => !prev)}>
                    {provider?.business_name}
                </h3>
                <h4 className="provider-rating">{getStars(averageRating)}</h4>
            </div>
            <p className='provider-descriptions'>
                {provider?.description}
            </p>
            
            {showDetails && (
                <div>
                    <h4 className="provider-reviews-header">{`Reviews (${reviews?.length})`}</h4>
                    <button className="write-review-button" onClick={() => setWriteReview((prevValue) => !prevValue)}>Write Review</button>
                    {currentUser && writeReview && (
                        <div>
                            <textarea placeholder="type review..." value={newReview} onChange={(e) => setNewReview(e.target.value)}></textarea>
                            
                            <div className="save-cancel-wrapper">
                                    <div className="star-editing-div">
                                        {renderEditableStars(newReviewRating, setNewReviewRating)}
                                    </div>
                                    <button className="save-cancel-edit-buttons" onClick={handleReviewPost}>Post</button>
                                    <button className="save-cancel-edit-buttons" onClick={handleReviewCancel}>Cancel</button>
                            </div>
                        </div>
                    )}
                    {reviews.map((review) => {
                        return (
                            <Review 
                                key={review?.id} 
                                review={review} 
                                reviewsList={reviews} 
                                providerId={provider?.id}
                                setReviewsList={setReviews}
                                onDelete={handleDeleteReview}
                                renderStars={renderStars}
                                setNewReviewRating={setNewReviewRating}
                                renderEditableStars={renderEditableStars}
                            />
                    )}
                    )}
                </div>
            )}
        </div>
    )
}

export default ServiceProvider;