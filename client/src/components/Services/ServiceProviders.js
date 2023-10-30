import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServiceProviders, setSelectedProvider } from './serviceProvidersSlice'
import ServiceProvider from './ServiceProvider'

function ServiceProviders({serviceType}){
    const dispatch = useDispatch()
    const serviceProviders = useSelector(state => state.serviceProviders.providers)

    // console.log(serviceType)

    useEffect(() => {
        const serviceProviders = serviceType.service_providers
        dispatch(setServiceProviders(serviceProviders))
    }, [])

    console.log(serviceType)

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