import { addReviewToProvider, setSelectedProvider } from "./serviceProvidersSlice";
import { updateServiceProviderInServiceType } from "./serviceTypesSlice";
import { setError } from "../errorSlice";
import { user } from "../User/userSlice";
import { useSelector } from "react-redux";

export const addReviewThunk = (providerId, reviewData, serviceTypeId) => async (dispatch, getState) => {
    
    try {
        const response = await fetch(`/service_providers/${providerId}/reviews`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.errors)
        }

        const newReviewData = await response.json();

        dispatch(addReviewToProvider({
            providerId: providerId,
            review: newReviewData
        }));

        const updatedState = getState();
        const updatedProvider = updatedState.serviceProviders.providers.find(p => p.id === providerId);

        if(updatedProvider) {
            dispatch(updateServiceProviderInServiceType({
                serviceTypeId: serviceTypeId,
                updatedProvider: updatedProvider
            }));
        }

        const currentUser = getState().user.currentUser;
        if(currentUser?.id === newReviewData.user_id){
            const updatedUser = {
                ...currentUser,
                reviews: [...currentUser.reviews, newReviewData]
            };
            dispatch(user(updatedUser))
        }

        
        
    } catch (error) {
        dispatch(setError(error.toString));
    }
}