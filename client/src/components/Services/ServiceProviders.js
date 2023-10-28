import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServiceProviders } from './serviceProvidersSlice'

function ServiceProviders({serviceType}){
    const dispatch = useDispatch()
    const serviceProviders = useSelector(state => state.serviceProviders.providers)

    // console.log({services})

    // useEffect(() => {
    //     fetch('/service_providers')
    //         .then((r) => r.json())
    //         .then((data) => dispatch(setServiceProviders(data)))
    // }, [dispatch])

    // useEffect(() => {
    //     const serviceProviders = serviceType.service_providers.filter((provider) => provider.service_type_id === serviceType.id)
    //     dispatch(setServiceProviders(serviceProviders))
    // }, [])

    console.log(serviceType)
    return (
        <div>

        </div>
    )
}

export default ServiceProviders;