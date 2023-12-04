import { addAppointmentToProvider } from "./serviceProvidersSlice";
import { updateServiceProviderInServiceType } from "./serviceTypesSlice";
import { setError } from "../errorSlice";
import { updateUser } from "../User/userSlice";

export const addAppointmentThunk = (providerId, appointmentData, serviceTypeId) => async (dispatch, getState) => {
    
    try {
        const currentUser = getState().user.currentUser;

        const response = await fetch(`/user_service_providers`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointmentData)
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.errors)
        }

        const newAppointmentData = await response.json();

        const appointmentToAdd = {
            date_hired: newAppointmentData.date_hired,
            time_hired: newAppointmentData.time_hired,
            user_id: newAppointmentData.user_id,
            service_provider_id: newAppointmentData.service_provider_id
        }
        


        dispatch(addAppointmentToProvider({
            appointmentToAdd
        }));

        const updatedProvider = getState().serviceProviders.providers.find(p => p.id === providerId);

        if(updatedProvider) {
            dispatch(updateServiceProviderInServiceType({
                serviceTypeId: serviceTypeId,
                updatedProvider: updatedProvider
            }));
        }

        
        if(currentUser?.id === newAppointmentData.user_id){
            const updatedUser = {
                ...currentUser,
                user_service_providers: [...currentUser.user_service_providers, newAppointmentData]
            };
            dispatch(updateUser(updatedUser))
        }

        
        
    } catch (error) {
        dispatch(setError(error.message));
    }
}