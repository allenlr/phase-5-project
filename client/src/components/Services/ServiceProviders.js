import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServiceProviders } from './serviceProvidersSlice'
import ServiceProvider from './ServiceProvider'


function ServiceProviders({serviceType}){
    const dispatch = useDispatch()
    const serviceProviders = useSelector(state => state.serviceProviders.providers)
    const selectedServiceProvider = useSelector(state => state.serviceProviders.selectedProvider)
    const [locationSearch, setLocationSearch] = useState(false)

    useEffect(() => {
        dispatch(setServiceProviders([])); 
        if (serviceType && Array.isArray(serviceType.service_providers)) {
            dispatch(setServiceProviders(serviceType.service_providers));
        } else {
            dispatch(setServiceProviders(selectedServiceProvider))
        }
    }, [serviceType, dispatch])


    return (
        <div className="providers-container">
            {serviceProviders.map((provider) => {
                return (
                    <div>
                        <ServiceProvider key={provider.id} provider={provider} />
                    </div>
                )
            })}
            <div className="black-background-container">
                <div className="location-button-container">
                    <button id="location-search-button" onClick={() => setLocationSearch(prevState => !prevState)}>Search by Location</button>
                    
                </div>
                
                    {locationSearch && 
                        <div className="zip-search-container">
                            <input id="zip-search-input" placeholder="Enter zipcode"></input>
                            <button id="location-search-button">Search</button>
                        </div>
                    }
            </div>
            
        </div>
    )
}

export default ServiceProviders;