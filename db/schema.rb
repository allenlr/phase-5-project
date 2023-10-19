# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_12_04_072459) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "service_provider_id", null: false
    t.integer "rating"
    t.text "comment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["service_provider_id"], name: "index_reviews_on_service_provider_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "service_providers", force: :cascade do |t|
    t.bigint "service_type_id", null: false
    t.string "business_name"
    t.text "description"
    t.decimal "longitude"
    t.decimal "latitude"
    t.string "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["service_type_id"], name: "index_service_providers_on_service_type_id"
  end

  create_table "service_types", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_service_providers", force: :cascade do |t|
    t.bigint "service_provider_id", null: false
    t.bigint "user_id", null: false
    t.date "date_hired"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.time "time_hired"
    t.index ["service_provider_id"], name: "index_user_service_providers_on_service_provider_id"
    t.index ["user_id"], name: "index_user_service_providers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "location"
  end

  add_foreign_key "reviews", "service_providers"
  add_foreign_key "reviews", "users"
  add_foreign_key "service_providers", "service_types"
  add_foreign_key "user_service_providers", "service_providers"
  add_foreign_key "user_service_providers", "users"
end
