import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    providers: [],
    selectedProvider: [],
    loading: false,
    error: null,
};

const serviceProvidersSlice = createSlice({
    name: 'serviceProviders',
    initialState,
    reducers: {
        setServiceProviders: (state, action) => {
            state.providers = action.payload;
        },
        setSelectedProvider: (state, action) => {
            state.providers = action.payload;
        },
    },
});

export const { setServiceProviders, setSelectedProvider } = serviceProvidersSlice.actions;

export default serviceProvidersSlice.reducer;