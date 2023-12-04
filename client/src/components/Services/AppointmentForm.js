import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function AppointmentForm(){
    const navigate = useNavigate();
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
        console.log({selectedDate, selectedTime});
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
    console.log(timeSlots);



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
            </form>
        </div>
    )
}


export default AppointmentForm;