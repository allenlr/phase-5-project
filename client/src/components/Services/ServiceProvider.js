import React, { useState } from 'react'
import './Services.css'
import { useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Review from './Review';

function ServiceProvider({provider}){
    // const reviews = Array.isArray(provider.reviews) ? provider.reviews : [];
    const [reviews, setReviews] = useState(provider.reviews || [])
    const [showDetails, setShowDetails] = useState(false)

    console.log(provider)
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
                            <Review key={review?.id} review={review} reviewsList={reviews} providerId={provider?.id} setReviewsList={setReviews}/>
                    )}
                    )}
                </div>
            )}
        </div>
    )
}

export default ServiceProvider;