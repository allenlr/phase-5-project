class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :user_id, :service_provider_id, :date, :username, :service_type, :service_provider

  belongs_to :service_provider

  def username
    object.user[:username]
  end

  def service_provider
    object.service_provider
  end

  def date
    "#{object.created_at.month}/#{object.created_at.day}/#{object.created_at.year}"
  end
  

  def service_type
    object.service_provider.service_type
  end
end
