import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentError: null,
    currentMessage :null
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.currentError = action.payload;
        },
        setMessage: (state, action) => {
            state.currentMessage = action.payload
        }
    },
});

export const { setError, setMessage } = errorSlice.actions;

export default errorSlice.reducer;