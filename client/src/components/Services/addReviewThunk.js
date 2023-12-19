import { addReviewToProvider } from "./serviceProvidersSlice";
import { updateServiceProviderInServiceType } from "./serviceTypesSlice";
import { setError } from "../errorSlice";
import { updateUser } from "../User/userSlice";

export const addReviewThunk = (providerId, reviewData, serviceTypeId) => async (dispatch, getState) => {
    try {
        const currentUser = getState().user.currentUser;
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
        const reviewToAdd = {
            comment: newReviewData.comment,
            date: newReviewData.date,
            id: newReviewData.id,
            rating: newReviewData.rating,
            service_provider_id: newReviewData.service_provider_id,
            user_id: newReviewData.user_id,
            username: newReviewData.username 
        };
        dispatch(addReviewToProvider({
            providerId: providerId,
            review: reviewToAdd
        }));
        const updatedProvider = getState().serviceProviders.providers.find(p => p.id === providerId);
        if(updatedProvider) {
            dispatch(updateServiceProviderInServiceType({
                serviceTypeId: serviceTypeId,
                updatedProvider: updatedProvider
            }));
        }
        if(currentUser?.id === newReviewData.user_id){
            const updatedUser = {
                ...currentUser,
                reviews: [...currentUser.reviews, newReviewData]
            };
            dispatch(updateUser(updatedUser))
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
}