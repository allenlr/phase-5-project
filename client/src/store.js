import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/User/userSlice'
import serviceTypesReducer from './components/Services/serviceTypesSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        serviceTypes: serviceTypesReducer

    },
});

export default store;
