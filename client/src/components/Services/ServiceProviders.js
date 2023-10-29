import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServiceProviders, setSelectedProvider } from './serviceProvidersSlice'

function ServiceProviders({serviceType}){
    const dispatch = useDispatch()
    const serviceProviders = useSelector(state => state.serviceProviders.providers)

    useEffect(() => {
        const serviceProviders = serviceType.service_providers.filter((provider) => provider.service_type_id === serviceType.id)
        dispatch(setServiceProviders(serviceProviders))
    }, [])

    console.log(serviceProviders[0])

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