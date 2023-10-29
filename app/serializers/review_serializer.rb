class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :user_id, :service_provider_id, :created_at
end
