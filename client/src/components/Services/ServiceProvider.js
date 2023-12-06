import './Services.css'
import '../User/User.css'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Review from './Review';
import { setError } from '../errorSlice';
import { addReviewThunk } from './addReviewThunk';
import { setSelectedProvider } from './serviceProvidersSlice';



function ServiceProvider({provider}){
    const dispatch = useDispatch();
    const updatedProvider = useSelector(state =>
        state.serviceProviders.providers.find(p => p.id === provider.id)
    );
    const selectedProvider = useSelector(state => state.serviceProviders.selectedProvider)
    const [reviews, setReviews] = useState(provider.reviews || [])
    const [showDetails, setShowDetails] = useState(false)
    const currentUser = useSelector(state => state.user.currentUser)
    const [newReview, setNewReview] = useState("")
    const [writeReview, setWriteReview] = useState(false)
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [averageRating, setAverageRating] = useState(provider.avg_rating)


    useEffect(() => {
        if (updatedProvider) {
            setReviews(updatedProvider.reviews || []);
            const totalRating = updatedProvider.reviews.reduce((acc, review) => acc + review.rating, 0);
            const avgRating = updatedProvider.reviews.length ? totalRating / updatedProvider.reviews.length : 0;
            setAverageRating(avgRating);
        }
    }, [updatedProvider]);

    function handleReviewCancel(){
        setNewReview("")
        setWriteReview(false)
        setNewReviewRating(5)
    }

    function writeReviewClick(){
        if (currentUser){
            setWriteReview(prevState => !prevState);
            dispatch(setError(null))
        } else {
            dispatch(setError("Please log in to write a new review"))
        }
    }


    async function handleReviewPost() {
        const reviewData = {
            comment: newReview,
            rating: newReviewRating,
            user_id: currentUser?.id
        }

           dispatch(addReviewThunk(provider.id, reviewData, provider.service_type_id));

            setWriteReview(false);
            setNewReview("");
            dispatch(setError(null));
    }

    function selectServiceProvider(){
        dispatch(setSelectedProvider(provider))
        setShowDetails((prev) => !prev)
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
                <h3 className='provider-names' onClick={selectServiceProvider}>
                    {provider?.business_name}
                </h3>
                
                
                <h4 className="provider-rating">{getStars(averageRating)}</h4>
                {showDetails && currentUser && (provider.id === selectedProvider?.id) && <Link id="schedule-button" to="/appointment_scheduling">Schedule Appointment!</Link>}
            </div>
            <p className='provider-descriptions'>
                {provider?.description}
            </p>
            
            {showDetails && (provider.id === selectedProvider?.id) && (
                <div>
                    <h4 className="provider-reviews-header">{`Reviews (${reviews?.length})`}</h4>
                    <button className="write-review-button" onClick={writeReviewClick}>Write Review</button>
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
                                serviceTypeId={provider.service_type_id}
                            />
                    )}
                    )}
                </div>
            )}
        </div>
    )
}

export default ServiceProvider;