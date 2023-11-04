class UsersController < ApplicationController
    before_action :authorize, except: [:create, :index, :show]

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
        unless user_params[:currentPassword].present?
            render json: { error: "Current password is required for any update"}, status: :unprocessable_entity
            return
        end

        unless current_user.authenticate(user_params[:currentPassword])
            render json: { error: "Current password is incorrect"}, status: :unprocessable_entity
            return
        end

        if user_params[:password].present? && user_params[:password].blank?
            render json: { error: "New password cannot be empty" }, status: :unprocessable_entity
            return
        end

        if current_user.update(user_params.except(:currentPassowrd))
            render json: current_user
        else
            render json: { error: "Update failed" }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, :currentPassword)
    end

end
