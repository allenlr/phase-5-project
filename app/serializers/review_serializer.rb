class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :user_id, :service_provider_id, :date, :username, :provider

  def username
    object.user[:username]
  end

  def provider
    object.service_provider[:business_name]
  end

  def date
    "#{object.created_at.month}/#{object.created_at.day}/#{object.created_at.year}"
  end
end
