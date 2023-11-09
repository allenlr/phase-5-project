class ServiceProviderSerializer < ActiveModel::Serializer
  attributes :id, :service_type_id, :business_name, :description, :longitude, :latitude, :location, :avg_rating

  has_many :reviews

  def avg_rating
    if object.reviews.any?
      object.reviews.average(:rating).to_f
    else
      "No Ratings Yet"
    end
  end
end
