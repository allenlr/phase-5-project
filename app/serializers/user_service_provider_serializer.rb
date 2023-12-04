class UserServiceProviderSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :service_provider_id, :date_hired, :time_hired, :business_name
  has_one :service_provider

  def time_hired
    object.time_hired.strftime("%H:%M") if object.time_hired
  end

  def date_hired
    "#{object.created_at.month}/#{object.created_at.day}/#{object.created_at.year}"
  end

  def business_name
    ServiceProvider.find_by(id: object.service_provider_id).business_name
  end

end
