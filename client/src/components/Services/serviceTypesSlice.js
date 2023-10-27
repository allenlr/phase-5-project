import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: [],
    loading: false,
    error: null,
};

const serviceTypesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        services: (state) => {
            state.services = action.payload;
        },
        addService: (state) => {
            state.services = [...state.services, action.payload]
        },
        removeService: (state) => {
            state.services = state.services.filter((service) => service.id !== action.payload)
        }
    },
});

export const { services, addService, removeService } = serviceTypesSlice.actions;

export default serviceTypesSlice.reducer;