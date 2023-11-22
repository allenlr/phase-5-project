import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    message: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        updateUser: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
});

export const { loginRequest, updateUser, logout } = userSlice.actions;

export default userSlice.reducer;