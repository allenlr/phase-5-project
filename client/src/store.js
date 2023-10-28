import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/User/userSlice'
import serviceTypesReducer from './components/Services/serviceTypesSlice';
import serviceProvidersReducer from './components/Services/serviceProvidersSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        serviceTypes: serviceTypesReducer,
        serviceProviders: serviceProvidersReducer,
    },
});

export default store;
