import { editReviewInProvider } from "./serviceProvidersSlice";
import { updateServiceProviderInServiceType } from "./serviceTypesSlice";
import { setError } from "../errorSlice";
import { updateUser } from "../User/userSlice";

export const editReviewThunk = (providerId, reviewData, reviewId, serviceTypeId) => async (dispatch, getState) => {

    try {
        const currentUser = getState().user.currentUser;

        const response = await fetch(`/service_providers/${providerId}/reviews/${reviewId}`, {
            credentials: 'include',
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        })
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.errors)
        }

        const editedReviewData = await response.json();

        const editedReview = {
            comment: editedReviewData.comment,
            rating: editedReviewData.rating,
        };
        


        dispatch(editReviewInProvider({
            providerId: providerId,
            review: editedReview
        }));

        const updatedProvider = getState().serviceProviders.providers.find(p => p.id === providerId);

        if(updatedProvider) {
            dispatch(updateServiceProviderInServiceType({
                serviceTypeId: serviceTypeId,
                updatedProvider: updatedProvider
            }));
        }

        const updatedUser = {
            ...currentUser,
            reviews: [...currentUser.reviews, newReviewData]
        };
        dispatch(updateUser(updatedUser))

    } catch (error) {
            dispatch(setError(error.message));
    }
}
