class UserServiceProvidersController < ApplicationController
    before_action :set_user, only: [:index, :create]
    before_action :set_service_provider, only: [:index, :create]

    def index
        if @user
            @user_service_providers = @user.user_service_providers
        elsif @service_provider
            @user_service_providers = @service_provider.user_service_providers
        else
            @user_service_providers = UserServiceProvider.all
        end
        render json: @user_service_providers, status: :ok
    end

    def create
        @user_service_provider = UserServiceProvider.create!(user_service_provider_params)
        if @user_service_provider.persisted?
            render json: @user_service_provider, status: :created
        else
            render json: { errors: @user_service_provider.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @user_service_provider = UserServiceProvider.find(params[:id])
        @user_service_provider.destroy
        head :no_content
    end

    private

    def set_user
        @user = User.find_by(id: params[:user_id]) if params[:user_id]
    end

    def set_service_provider
        @service_provider = ServiceProvider.find_by(id: params[:service_provider_id]) if params[:service_provider]
    end

    def user_service_provider_params
        params.permit(:user_id, :service_provider_id, :date_hired)
    end

end
