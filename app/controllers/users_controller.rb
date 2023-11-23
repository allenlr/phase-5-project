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

    def destroy
        user = User.find_by(id: params[:id])

        unless user 
            return render json: { error: "User not found" }, status: :not_found
        end

        unless user_params[:currentPassword].present? && user.authenticate(params[:currentPassword])
            return render json: { error: "Password is required for this action"}, status: :unprocessable_entity
        end

        unless user.id == session[:user_id]
            return render json: {error: "Not Authorized"}, status: :unauthorized
        end

        user.destroy
        head :no_content
    end

    def user_accessed_service_provider
        service_provider = ServiceProvider.find(params[:service_provider_id])
        render json: service_provider, include: ['reviews'], status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, :currentPassword)
    end

end
