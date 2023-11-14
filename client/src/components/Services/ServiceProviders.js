import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServiceProviders } from './serviceProvidersSlice'
import ServiceProvider from './ServiceProvider'


function ServiceProviders({serviceType}){
    const dispatch = useDispatch()
    const error = useSelector(state => state.error.currentError)
    const serviceProviders = useSelector(state => state.serviceProviders.providers)
    const selectedServiceProvider = useSelector(state => state.serviceProviders.selectedProvider)

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
                    <button id="location-search-button">Search by location</button>
                </div>
            </div>

        </div>
    )
}

export default ServiceProviders;