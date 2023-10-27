import './Services.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, addService, removeService } from './serviceTypesSlice'
import { Link } from 'react-router-dom';
import Service from './Service';

function ServiceTypes(){
    const dispatch = useDispatch();
    const serviceTypes = useSelector(state => state.serviceTypes.services); 
    

    useEffect(() => {
        fetch('/service_types')
        .then((r) => r.json())
        .then((servicesData) => {
            dispatch(getServices(servicesData))
        })
    }, [dispatch])

    return(
        <div className="services-container">
            {serviceTypes.map((service) => {
                return (
                    <div key={service.id}>
                        <h3 className='service-names'>
                            {service.name}
                        </h3>
                        <p className='service-descriptions'>
                            {service.description}
                        </p>
                    </div>
                )
            })}

        </div>
    )
}

export default ServiceTypes;