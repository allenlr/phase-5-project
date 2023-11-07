class ReviewsController < ApplicationController
    before_action :set_reviewable
    before_action :authorize, except: [:show, :index]

    def index
        reviews = @reviewable.reviews
        render json: reviews, include: ['service_provider'], status: :ok
    end

    def show
        review = @reviewable.reviews.find(params[:id])
        render json: review, status: :ok
    end

    def update
        
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
