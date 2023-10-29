class ServiceProviderSerializer < ActiveModel::Serializer
  attributes :id, :service_type_id, :business_name, :description, :longitude, :latitude, :location

  has_many :reviews
end
