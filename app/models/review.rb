class Review < ApplicationRecord
  belongs_to :user
  belongs_to :service_provider
end
