import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { services, addService, removeService } from './serviceTypesSlice'

function ServiceTypes(){
    const dispatch = useDispatch();
    const services = useSelector(state => state.services);

    useEffect(() => {
        fetch('/service_types')
        .then((r) => r.json())
        .then((data) => console.log(data))
    }, [])

    return(
        <div>

        </div>
    )
}

export default ServiceTypes;