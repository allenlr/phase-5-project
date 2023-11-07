import React, { useState } from 'react'
import './Services.css'
import { useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Reviews from './Reviews';

function ServiceProvider({provider}){
    const reviews = Array.isArray(provider.reviews) ? provider.reviews : [];
    const [showDetails, setShowDetails] = useState(false)
    

    return(
        <div>
            <h3 className='provider-names' onClick={() => setShowDetails((prev) => !prev)}>
                {provider.business_name}
            </h3>
            <p className='provider-descriptions'>
                {provider.description}
            </p>
            {showDetails && (
                <Reviews reviews={reviews} providerId={provider.id}/>
            )}
        </div>
    )
}

export default ServiceProvider;