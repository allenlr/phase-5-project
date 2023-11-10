import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentError: null
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.currentError = action.payload;
        }
    },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;