class AddDetailsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :username, :string
    add_column :users, :email, :string
    add_column :users, :password_digest, :string
    add_column :users, :location, :string
  end
end
