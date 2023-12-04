class UserServiceProvider < ApplicationRecord
  belongs_to :service_provider
  belongs_to :user

  validates :date_hired, :time_hired, presence: true
end
