import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServiceProviders, setSelectedProvider } from './serviceProvidersSlice'

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
                    <div key={provider.id}>
                        <h3 className='provider-names' >
                            {provider.business_name}
                        </h3>
                        <p className='provider-descriptions'>
                            {provider.description}
                        </p>
                    </div>
                )
            })}

        </div>
    )
}

export default ServiceProviders;