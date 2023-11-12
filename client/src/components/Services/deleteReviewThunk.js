import { deleteReviewFromProvider } from "./serviceProvidersSlice";
import { updateServiceProviderInServiceType } from "./serviceTypesSlice";
import { setError } from "../errorSlice";
import { user } from "../User/userSlice";

export const deleteReviewThunk = (providerId, reviewId, serviceTypeId) => async (dispatch, getState) => {

    try {
        const currentUser = getState().user.currentUser;

        const response = await fetch(`/service_providers/${providerId}/reviews/${reviewId}`, {
            credentials: "include",
            method: "DELETE",
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.errors || "Failed to delete review")
        }

        dispatch(deleteReviewFromProvider({
            providerId: providerId,
            reviewId: reviewId
        }));

        const updatedProvider = getState().serviceProviders.providers.find(p => p.id === providerId);

        if(updatedProvider) {
            dispatch(updateServiceProviderInServiceType({
                serviceTypeId: serviceTypeId,
                updatedProvider: updatedProvider
            }));
        }

        if(currentUser){
            const updatedUser = {
                ...currentUser,
                reviews: currentUser.reviews.filter(review => review.id !== reviewId)
            }
            dispatch(user(updatedUser))
        }
    } catch(error){
        dispatch(setError(error.message));
    }
}