class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :location
end
