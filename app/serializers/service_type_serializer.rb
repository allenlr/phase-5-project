class ServiceTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  has_many :service_providers
end
