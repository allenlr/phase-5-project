import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setServiceProviders } from './serviceProvidersSlice'
import { setSelectedServiceTypeById } from './serviceTypesSlice'
import ServiceProvider from './ServiceProvider'
import { setError } from '../errorSlice'


function ServiceProviders({serviceType}){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const serviceProviders = useSelector(state => state.serviceProviders.providers)
    const selectedServiceProvider = useSelector(state => state.serviceProviders.selectedProvider)
    const [locationSearch, setLocationSearch] = useState(false)
    const [zipCode, setZipCode] = useState("")
    const [distanceThreshold, setDistanceThreshold] = useState("All")

    useEffect(() => {
        dispatch(setServiceProviders([])); 
        if (serviceType && Array.isArray(serviceType.service_providers)) {
            dispatch(setServiceProviders(serviceType.service_providers));
        } else {
            dispatch(setServiceProviders(selectedServiceProvider))
        }
    }, [serviceType, dispatch])

    function handleLocationSearch(){
        if(!!serviceType?.id){
            fetch(`/${serviceType?.id}/service_providers/location/${zipCode}/${distanceThreshold}`)
            .then(r => {
                if (!r.ok){
                    return r.json().then(errorJson => {
                        throw new Error(errorJson.error || "Location search error")
                    })
                } else {
                    return r.json();
                }
            })
            .then(locatedServiceProviders => {
                if(locatedServiceProviders.length === 0){
                    dispatch(setError("No Service Providers in this area. Try searching a different zip code or changing the distance of your search."))
                } else {
                    dispatch(setServiceProviders(locatedServiceProviders))
                    dispatch(setError(null))
                }
            })
            .catch(error => {
                dispatch(setError(error.message))
            })
        } else{
            navigate('/services')
        }
    }



    return (
        <div className="providers-container">
            {serviceProviders?.map((provider) => {
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
                            <input 
                                id="zip-search-input"
                                type="text"
                                placeholder="Enter zipcode" 
                                value={zipCode} 
                                onChange={(e) => setZipCode(e.target.value)}
                            >
                            </input>
                            <select
                                value={distanceThreshold}
                                onChange={(e) => setDistanceThreshold(e.target.value)}
                                id="distance-threshold-select"
                            >
                                <option value="All">All</option>
                                <option value="5">5 miles</option>
                                <option value="10">10 miles</option>
                                <option value="20">20 miles</option>
                                <option value="30">30 miles</option>
                                <option value="50">50 miles</option>
                            </select>
                            <button id="search-submit-button" onClick={handleLocationSearch}>Search</button>
                        </div>
                    }
            </div>
            
        </div>
    )
}

export default ServiceProviders;