class UserServiceProviderSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :service_provider_id, :date_hired
  has_one :service_provider
end
