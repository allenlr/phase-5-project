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
        },
        updateServiceProviderInServiceType: (state, action) => {
            const { serviceTypeId, updatedProvider } = action.payload;
            const serviceTypeIndex = state.services.findIndex(s => s.id === serviceTypeId);
            if (serviceTypeIndex !== -1) {
                const providerIndex = state.services[serviceTypeIndex].service_providers.findIndex(p => p.id === updatedProvider.id);
                if (providerIndex !== -1) {
                    state.services[serviceTypeIndex].service_providers[providerIndex] = updatedProvider;
                }
            }
        },
    },
});

export const { getServices, setSelectedServiceType, addService, removeService, updateServiceProviderInServiceType } = serviceTypesSlice.actions;

export default serviceTypesSlice.reducer;