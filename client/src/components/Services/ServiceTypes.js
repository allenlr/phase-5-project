import './Services.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, setSelectedServiceType } from './serviceTypesSlice'
import { Link } from 'react-router-dom';
import { setError } from '../errorSlice';


function ServiceTypes(){
    const dispatch = useDispatch();
    const serviceTypes = useSelector(state => state.serviceTypes.services); 
    

    useEffect(() => {
        fetch('/service_types')
        .then((r) => {
            if(!r.ok){
                return r.json().then(errorJson => {
                    throw new Error(errorJson.errors.join(", ") || "Failed to fetch Service Types");
                });
            } else {
                return r.json();
            }
        })
        .then((serviceTypesData) => {
            dispatch(getServices(serviceTypesData))
            dispatch(setError(null))
        })
        .catch(error => {
            dispatch(setError(error.message))
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
                        <Link to="/service_providers" className="service-names" onClick={() => handleServiceTypeSelect(type)}>
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