import './Services.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, setSelectedServiceType, addService, removeService } from './serviceTypesSlice'
import { Link } from 'react-router-dom';


function ServiceTypes(){
    const dispatch = useDispatch();
    const serviceTypes = useSelector(state => state.serviceTypes.services); 
    

    useEffect(() => {
        fetch('/service_types')
        .then((r) => r.json())
        .then((serviceTypesData) => {
            dispatch(getServices(serviceTypesData))
        })
    }, [dispatch])

    function handleServiceTypeSelect(type){
        dispatch(setSelectedServiceType(type))
    }

    return(
        <div className="services-container">
            {serviceTypes.map((type) => {
                return (
                    <div key={type.id}>
                        <Link to="/service_providers" className='service-names' onClick={handleServiceTypeSelect(type)}>
                            {type.name}
                        </Link>
                        <p className='service-descriptions'>
                            {type.description}
                        </p>
                    </div>
                )
            })}

        </div>
    )
}

export default ServiceTypes;