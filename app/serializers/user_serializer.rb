class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :location

  has_many :reviews
  has_many :service_providers
  has_many :user_service_providers
end
