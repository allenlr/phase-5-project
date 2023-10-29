class ServiceProvider < ApplicationRecord
  belongs_to :service_type
  has_many :user_service_providers, dependent: :destroy
  has_many :users, through: :user_service_providers
  has_many :reviews, dependent: :destroy
end
