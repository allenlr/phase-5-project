import React, { useState } from 'react'
import './Services.css'

function ServiceProvider({provider}){
    const [showDetails, setShowDetails] = useState(false)

    const reviews = Array.isArray(provider.reviews) ? provider.reviews : [];

    return(
        <div key={provider.id}>
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
                                <div className="comment-text">
                                    <p>{review.comment}</p>
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