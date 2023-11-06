import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServiceProviders, setSelectedProvider } from './serviceProvidersSlice'
import ServiceProvider from './ServiceProvider'

function ServiceProviders({serviceType}){
    const dispatch = useDispatch()
    const serviceProviders = useSelector(state => state.serviceProviders.providers)

    useEffect(() => {
        if (serviceType && Array.isArray(serviceType.service_providers)) {
            dispatch(setServiceProviders(serviceType.service_providers));
        }
    }, [serviceType, dispatch])


    return (
        <div className="providers-container">
            {serviceProviders.map((provider) => {
                return (
                    <ServiceProvider provider={provider} />
                )
            })}

        </div>
    )
}

export default ServiceProviders;