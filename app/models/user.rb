class User < ApplicationRecord
    has_secure_password

    has_many :reviews, dependent: :destroy
    has_many :user_service_providers, dependent: :destroy
    has_many :service_providers, through: :user_service_providers

    validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 20 }
    validates :email, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validate :zip_code_valid, if: -> { location.present? }

    private

    def zip_code_valid
        errors.add(:location, "is not a valid ZIP code") unless location.match?(/^\d{5}(-\d{4})?$/)
    end
end
