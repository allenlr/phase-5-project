class ReviewsController < ApplicationController
    before_action :set_reviewable
    before_action :authorize, except: [:show, :index]
    wrap_parameters false

    def index
        reviews = @reviewable.reviews
        render json: reviews, include: ['service_provider'], status: :ok
    end

    def show
        review = @reviewable.reviews.find(params[:id])
        render json: review, status: :ok
    end

    def update
        review = @reviewable.reviews.find(params[:id])
        
        if review.update(review_params)
          render json: review, status: :ok
        else
          render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def create
        service_provider = ServiceProvider.find(params[:service_provider_id])
        user = User.find(params[:user_id])
        review = service_provider.reviews.create!(review_params)

        new_avg_rating = service_provider.reviews.average(:rating).to_f.round(1)

        render json: { review: review, new_avg_rating: new_avg_rating, username: user.username }, status: :created
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
