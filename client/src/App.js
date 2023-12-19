import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSelector, useDispatch } from 'react-redux'
import Home from './components/Home';
import NotFound from './components/NotFound';
import Account from './components/User/Account';
import ServiceTypes from './components/Services/ServiceTypes';
import Login from './components/User/Login';
import ServiceProviders from './components/Services/ServiceProviders';
import Profile from './components/User/Profile';
import Register from './components/User/Register';
import AppointmentForm from './components/Services/AppointmentForm';
import { updateUser, loginRequest } from './components/User/userSlice';
// import { setError } from './components/errorSlice';




function App() {
  const selectedServiceType = useSelector(state => state.serviceTypes.selectedServiceType)
  const error = useSelector(state => state.error?.currentError)
  const successMessage = useSelector(state => state.error?.currentMessage)
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    if(currentUser?.id){
      fetch(`/users/${currentUser?.id}`)
      .then(r => {
        if(!r.ok){
          return r.json().then(data => {
            throw new Error(data.error)
          })
        } else {
          return r.json()
        }
      })
      .then(user => {
        dispatch(updateUser(user))
        dispatch(loginRequest())
      })
      .catch(error => {
        console.error(error.message)
      })
    }
  }, [currentUser?.id])
  
  
  return (
    <div className="application">
      
      <Router>
        <Navbar />
        {error && <span id="error-handle">{error}</span>}
        {successMessage && <span id="success-handle">{successMessage}</span>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/services" element={<ServiceTypes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/service_providers" element={<ServiceProviders serviceType={selectedServiceType}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointment_scheduling" element={<AppointmentForm/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
