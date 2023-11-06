class UsersController < ApplicationController
    before_action :authorize, except: [:create, :index]

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user, status: :ok
    end

    def create
        user = User.create(user_params)
        if user.valid?
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by(id: session[:user_id])

        unless user_params[:currentPassword].present?
            render json: { error: "Current password is required for any updates"}, status: :unprocessable_entity
            return
        end

        unless user.authenticate(user_params[:currentPassword])
            render json: { error: "Current password is incorrect"}, status: :unprocessable_entity
            return
        end

        if user_params[:password].present? && user_params[:password].blank?
            render json: { error: "New password cannot be empty" }, status: :unprocessable_entity
            return
        end

        if user.update(user_params.except(:currentPassword))
            render json: user
        else
            render json: { error: "Update failed" }, status: :unprocessable_entity
        end
    end

    def service_providers_reviewed
        user = User.find(params[:id])
        service_providers = user.user_service_providers.map(&:service_provider).uniq
        service_providers_with_reviews = ServiceProvider.where(id: service_providers).includes(:reviews)
    
        render json: service_providers_with_reviews.as_json(include: :reviews)
      end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, :currentPassword)
    end

end
