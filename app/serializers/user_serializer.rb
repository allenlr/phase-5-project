class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :location

  has_many :reviews
end
