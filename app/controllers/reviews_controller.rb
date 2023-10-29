class ReviewsController < ApplicationController
    before_action :set_reviewable

    def index
        reviews = @reviewable.reviews
        render json: reviews, status: :ok
    end

    def show
        review = @reviewable.reviews.find(params[:id])
        render json: review, status: :ok
    end

    private

    def set_reviewable
        @reviewable = if params[:user_id]
            User.find(params[:user_id])
        elsif params[:service_provider_id]
            ServiceProvider.find(params[:service_provider_id])
        end
    end

    def review_params
        params.permit(:comment, :rating, :user_id, :service_provider_id)
    end

end
