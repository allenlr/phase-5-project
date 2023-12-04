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
            state.selectedProvider = action.payload;
        },
        addReviewToProvider: (state, action) => {
            const { providerId, review } = action.payload;
            const providerIndex = state.providers.findIndex(p => p.id === providerId);
            if (providerIndex !== -1) {
                state.providers[providerIndex].reviews.push(review);
            }
        },
        deleteReviewFromProvider: (state, action) => {
            const { providerId, reviewId } = action.payload;
            const providerIndex = state.providers.findIndex(p => p.id === providerId);
            if (providerIndex !== -1) {
                state.providers[providerIndex].reviews = state.providers[providerIndex].reviews.filter(review => review.id !== reviewId)
            }
        },
        editReviewInProvider: (state, action) => {
            const {providerId, editedReview } = action.payload;
            const providerIndex = state.providers.findIndex(p => p.id === providerId);
            if (providerIndex !== -1) {
                state.providers[providerIndex].reviews.map((review) => {
                    if(review.id === editedReview.id){
                        return editedReview
                    } else {
                        return review
                    }
                })
            }
        },
        addAppointmentToProvider: (state, action) => {
            const { providerId, appointment } = action.payload;
            const providerIndex = state.providers.findIndex(p => p.id === providerId);
            if (providerIndex !== -1) {
                state.providers[providerIndex].user_service_providers.push(appointment);
            }
        },
    },
});

export const { setServiceProviders, setSelectedProvider, addReviewToProvider, deleteReviewFromProvider, editReviewInProvider, addAppointmentToProvider } = serviceProvidersSlice.actions;

export default serviceProvidersSlice.reducer;