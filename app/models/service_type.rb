class ServiceType < ApplicationRecord
    has_many :service_providers, dependent: :destroy
end
