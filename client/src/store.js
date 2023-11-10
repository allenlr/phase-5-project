import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/User/userSlice'
import serviceTypesReducer from './components/Services/serviceTypesSlice';
import serviceProvidersReducer from './components/Services/serviceProvidersSlice';
import errorReducer from './components/errorSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        serviceTypes: serviceTypesReducer,
        serviceProviders: serviceProvidersReducer,
        error: errorReducer,
    },
});

export default store;
