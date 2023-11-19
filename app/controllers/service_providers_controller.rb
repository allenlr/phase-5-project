class ServiceProvidersController < ApplicationController
    

    def index
        service_providers = ServiceProvider.all
        render json: service_providers, include: ['reviews'], status: :ok
    end

    def show
        service_provider = ServiceProvider.find(params[:id])
        render json: service_provider, include: ['reviews'], status: :ok
    end

    def search_by_location
        location = Geocoder.coordinates(params[:zip_code])
        distance_threshold = params[:distance]
        if location
            if distance_threshold.present? && distance_threshold != "All"
                distance_threshold = distance_threshold.to_i
                service_providers = ServiceProvider.near(location, distance_threshold)
            else
                service_providers = ServiceProvider.all
            end
            render json: service_providers, status: :ok
        else
            render json: { errors: "Invalid zip code"}, status: :unprocessable_entity
        end
    end



end
