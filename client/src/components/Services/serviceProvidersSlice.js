import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    providers: [],
    loading: false,
    error: null,
};

const serviceProvidersSlice = createSlice({
    name: 'serviceProviders',
    initialState,
    reducers: {
        setServiceProviders: (state, action) => {
            state.providers = action.payload;
        }
    },
});

export const { setServiceProviders } = serviceProvidersSlice.actions;

export default serviceProvidersSlice.reducer;