class AddTimeHiredToUserServiceProviders < ActiveRecord::Migration[6.1]
  def change
    add_column :user_service_providers, :time_hired, :time
  end
end
