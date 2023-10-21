class ServiceTypesController < ApplicationController

    def index
        service_types = ServiceType.all
        render json: service_types, status: :ok
    end

    def show
        service_type = ServiceType.find(params[:id])
        render json: service_type, status: :ok
    end
end
