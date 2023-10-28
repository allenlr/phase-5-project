import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux'
import Home from './components/Home';
import NotFound from './components/NotFound';
import Account from './components/User/Account';
import ServiceTypes from './components/Services/ServiceTypes';
import Login from './components/User/Login';
import ServiceProviders from './components/Services/ServiceProviders';

function App() {
  const selectedServiceType = useSelector(state => state.serviceTypes.selectedServiceType)
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/services" element={<ServiceTypes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service_providers" element={<ServiceProviders serviceType={selectedServiceType}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
