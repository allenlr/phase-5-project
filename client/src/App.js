import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux'
import Home from './components/Home';
import NotFound from './components/NotFound';
import Account from './components/User/Account';
import ServiceTypes from './components/Services/ServiceTypes';
import Login from './components/User/Login';
import ServiceProviders from './components/Services/ServiceProviders';
import Profile from './components/User/Profile';
import Register from './components/User/Register';


function App() {
  const selectedServiceType = useSelector(state => state.serviceTypes.selectedServiceType)
  const error = useSelector(state => state.error?.currentError)
  
  
  return (
    <div>
      
      <Router>
        <Navbar />
        {error && <span id="error-handle" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight:"60px"}}>{error}</span>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/services" element={<ServiceTypes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/service_providers" element={<ServiceProviders serviceType={selectedServiceType}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
