class CreateServiceProviders < ActiveRecord::Migration[6.1]
  def change
    create_table :service_providers do |t|
      t.references :service_type, null: false, foreign_key: true
      t.string :business_name
      t.text :description
      t.decimal :longitude
      t.decimal :latitude
      t.string :location

      t.timestamps
    end
  end
end
