class CreateUserServiceProviders < ActiveRecord::Migration[6.1]
  def change
    create_table :user_service_providers do |t|
      t.references :service_provider, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.date :date_hired

      t.timestamps
    end
  end
end
