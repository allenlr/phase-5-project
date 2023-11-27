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
        service_type_id = params[:service_type_id]
        location = Geocoder.coordinates("#{params[:zip_code]}, US")
        distance_threshold = params[:distance]
        
        if location
            distance_threshold = distance_threshold.to_i if 
            if distance_threshold.present? && distance_threshold != "All"
                service_providers = ServiceProvider.where(service_type_id: service_type_id).near(location, distance_threshold.to_i)
            else
                service_providers = ServiceProvider.where(service_type_id: service_type_id)
            end
            render json: service_providers, status: :ok
        else
            render json: { errors: "Invalid zip code"}, status: :unprocessable_entity
        end
    end



end
