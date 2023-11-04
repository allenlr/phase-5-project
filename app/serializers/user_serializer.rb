class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :location

  has_many :reviews
end
