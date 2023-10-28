class ServiceProviderSerializer < ActiveModel::Serializer
  attributes :id, :service_type_id, :business_name, :description, :longitude, :latitude, :location
end
