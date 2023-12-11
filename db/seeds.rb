# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Review.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('reviews')

UserServiceProvider.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('user_service_providers')

ServiceProvider.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('service_providers')

ServiceType.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('service_types')

User.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('users')





<<<<<<< HEAD
=======






>>>>>>> 36feb00 (create seed data for each model, edit database.yml file to utilize postgresql instead of sqlite3)
service_types = [
    'Home Services',
    'Health & Wellness',
    'Automotive',
    'Beauty & Personal Care',
    'Events & Entertainment',
    'Education & Training',
    'Tech & Electronics',
    'Pet Services',
    'Professional Services',
    'Travel & Transport'
]

denver_zip_codes = [
  80202, 80203, 80204, 80205, 80206,
  80209, 80210, 80211, 80212, 80218
]

denver_zip_codes_data = {
  80202 => { latitude: 39.7515, longitude: -104.9968 },
<<<<<<< HEAD
  80903 => { latitude: 38.8339, longitude: -104.8214 },
  80301 => { latitude: 40.0150, longitude: -105.0021 },
  80521 => { latitude: 40.5853, longitude: -105.0844 },
  81001 => { latitude: 38.2544, longitude: -104.6091 },
  81601 => { latitude: 39.5505, longitude: -107.3248 },
  81501 => { latitude: 39.0639, longitude: -108.5506 },
  81301 => { latitude: 37.2753, longitude: -107.8801 },
  81611 => { latitude: 39.1911, longitude: -106.8175 },
  81657 => { latitude: 39.6403, longitude: -106.3742 }
}


=======
  80203 => { latitude: 39.7314, longitude: -104.9830 },
  80204 => { latitude: 39.7365, longitude: -105.0021 },
  80205 => { latitude: 39.7594, longitude: -104.9688 },
  80206 => { latitude: 39.7231, longitude: -104.9562 },
  80209 => { latitude: 39.7059, longitude: -104.9663 },
  80210 => { latitude: 39.6766, longitude: -104.9647 },
  80211 => { latitude: 39.7675, longitude: -105.0033 },
  80212 => { latitude: 39.7736, longitude: -105.0482 },
  80218 => { latitude: 39.7442, longitude: -104.9708 }
}

>>>>>>> 36feb00 (create seed data for each model, edit database.yml file to utilize postgresql instead of sqlite3)
10.times do |i|
    zipcode = denver_zip_codes[i % denver_zip_codes.size]
    username = ""
    until username.length.between?(3, 20)
      username = Faker::Internet.unique.username[0..20]
    end
    User.create!(
        username: username,
        email: Faker::Internet.unique.email,
        password_digest: BCrypt::Password.create('defaultpassword'),
        location: zipcode.to_s
      )
end

service_types.each do |type|
    ServiceType.create!(
        name: type,
        description: Faker::Company.catch_phrase
    )
end

service_type_ids = ServiceType.pluck(:id)

denver_zip_codes_data.each do |zipcode, coordinates|
  5.times do
    ServiceProvider.create!(
      service_type_id: service_type_ids.sample,
      business_name: Faker::Company.name,
      description: Faker::Company.catch_phrase,
      longitude: coordinates[:longitude],
      latitude: coordinates[:latitude],
      location: zipcode.to_s
    )
  end
end

user_ids = User.pluck(:id)
service_provider_ids = ServiceProvider.pluck(:id)

user_ids.each do |user_id|
    2.times do 
      time_hired = Time.now.beginning_of_day + rand(9..16).hours + rand(0..59).minutes

        UserServiceProvider.create!(
            user_id: user_id,
            service_provider_id: service_provider_ids.sample,
            date_hired: Faker::Date.between(from: '2020-01-01', to: Date.today),
            time_hired: time_hired.strftime("%H:%M")
        )
    end
end

User.all.each do |user|
    rand(2..7).times do
        Review.create!(
            user_id: user.id,
            service_provider_id: service_provider_ids.sample,
            rating: rand(1..5),
            comment: Faker::Lorem.sentence
        )
    end
end

puts "Seeded!"
    
