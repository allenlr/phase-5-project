import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { setError } from '../errorSlice';

function AppointmentForm(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const serviceProvider = useSelector(state => state.serviceProviders.selectedProvider)
    const currentUser = useSelector(state => state.user.currentUser)

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        if(!serviceProvider || !currentUser){
            navigate('/')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/user_service_providers`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_provider_id: serviceProvider.id,
                user_id: currentUser.id,
                date_hired: selectedDate.toISOString().split('T')[0],
                time_hired: selectedTime
            })
        })
        .then(r => {
            if(!r.ok){
                return r.json().then(error => {
                    throw new Error(error.message)
                })
            } else {
                return r.json();
            }
        })
        .then(data => {
            console.log(data)
            navigate(`/service_providers`);
            dispatch(setError(null))
        })
        .catch(error => {
            dispatch(setError(error.message))
        })
    };

    function generateTimeSlots(startHour, endHour, intervalMinutes){
        const slots = [];
        let currentTime = new Date();
        currentTime.setHours(startHour, 0, 0);

        while (currentTime.getHours() < endHour){
            const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
            slots.push(timeString);
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
        }

        return slots;
    }

    const timeSlots = generateTimeSlots(9, 17, 30);

    return(
        <div className="scheduling-div">
            <h3 id="schedule-header">
                Scheduling Appointment with {serviceProvider.business_name}
            </h3>
            <form onSubmit={handleSubmit} className="schedule-form">
                <div>
                    <label htmlFor="date">Date:</label>
                    <DatePicker

                        id="date-picker"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateForm="MMMM d, yyyy"
                        minDate={new Date()}
                    />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <select
                        id="time-selection"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                    >
                        <option className="time-options" value="" disabled hidden>Select a time</option>
                        {timeSlots.map((slot, index) => {
                            return <option key={index} value={slot} className="time-options">{slot}</option>
                        })}
                    </select>
                </div>
                <button type="submit" id="appointment-submit-button">Submit</button>
            </form>
        </div>
    )
}


export default AppointmentForm;