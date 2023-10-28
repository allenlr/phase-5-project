import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: [],
    selectedServiceType: null,
    loading: false,
    error: null,
};

const serviceTypesSlice = createSlice({
    name: 'serviceTypes',
    initialState,
    reducers: {
        getServices: (state, action) => {
            state.services = action.payload;
        },
        setSelectedServiceType: (state, action) => {
            state.selectedServiceType = action.payload;
          },
        addService: (state, action) => {
            state.services = [...state.services, action.payload]
        },
        removeService: (state, action) => {
            state.services = state.services.filter((service) => service.id !== action.payload)
        }
    },
});

export const { getServices, setSelectedServiceType, addService, removeService } = serviceTypesSlice.actions;

export default serviceTypesSlice.reducer;