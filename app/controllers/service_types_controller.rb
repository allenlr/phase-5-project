class ServiceTypesController < ApplicationController

    def index
        service_types = ServiceType.all
        render json: service_types, include: ['service_providers', 'service_providers.reviews'], status: :ok
    end

    def show
        service_type = ServiceType.find(params[:id])
        render json: service_type, status: :ok
    end
end
