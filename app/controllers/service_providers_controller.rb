class ServiceProvidersController < ApplicationController

    def index
        service_providers = ServiceProvider.all
        render json: service_providers, include: ['reviews'], status: :ok
    end

    def show
        service_provider = ServiceProvider.find(params[:id])
        render json: service_provider, status: :ok
    end

end
