# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Trip.delete_all
User.delete_all

loganyu = User.create!(:username => "loganyu", :password => "password", :role => "admin")
Trip.create!(
  :user_id => loganyu.id,
  :destination => "Seattle",
  :comment => "Starbucks was fun",
  :start_date => Date.new(2018,12,31),
  :end_date => Date.new(2019,1,7),
)
Trip.create!(
  :user_id => loganyu.id,
  :destination => "Oakland and Death Valley",
  :comment => "Scootered in Oakland and went into the basin in Death Valley",
  :start_date => Date.new(2019,1,7),
  :end_date => Date.new(2019,1,14),
)
Trip.create!(
  :user_id => loganyu.id,
  :destination => "Zurich",
  :comment => "Hanging out with Lin",
  :start_date => Date.new(2019,1,15),
  :end_date => Date.new(2019,1,16),
)
Trip.create!(
  :user_id => loganyu.id,
  :destination => "Kenya",
  :comment => "Running with the Kenyans",
  :start_date => Date.new(2019,1,17),
  :end_date => Date.new(2019,2,16),
)
Trip.create!(
  :user_id => loganyu.id,
  :destination => "Austin",
  :comment => "Best time with Jess! 🥰",
  :start_date => Date.new(2019,2,17),
  :end_date => Date.new(2019,2,16),
)
Trip.create!(
  :user_id => loganyu.id,
  :destination => "London",
  :comment => "Watching the marathon!",
  :start_date => Date.new(2019,5,1),
  :end_date => Date.new(2019,5,10),
)
Trip.create!(
  :user_id => loganyu.id,
  :destination => "Hong Kong",
  :comment => "Going to eat a lot of food.",
  :start_date => Date.new(2019,5,11),
  :end_date => Date.new(2019,5,17),
)
Trip.create!(
  :user_id => loganyu.id,
  :destination => "Taipei",
  :comment => "More exploring.",
  :start_date => Date.new(2019,5,17),
  :end_date => Date.new(2019,6,10),
)

toptal = User.create!(:username => "toptal", :password => "password", :role => "admin")
10.times do
    start_date = Faker::Date.between(1.months.ago, 2.months.from_now)
    Trip.create!(
      :user_id => toptal.id,
      :destination => Faker::Nation.capital_city,
      :comment => Faker::Lorem.paragraph,
      :start_date => start_date,
      :end_date => Faker::Date.between(start_date + 2.days, start_date + 2.weeks),
    )
  end

5.times do
  username = Faker::Name.name.split.join('_')
  user = User.create(username: username, password: 'password', role: 'manager')
  10.times do
    start_date = Faker::Date.between(1.months.ago, 2.months.from_now)
    Trip.create!(
      :user_id => user.id,
      :destination => Faker::Nation.capital_city,
      :comment => Faker::Lorem.paragraph,
      :start_date => start_date,
      :end_date => Faker::Date.between(start_date + 2.days, start_date + 2.weeks),
    )
  end
end

5.times do
  username = Faker::Name.name.split.join('_')
  user = User.create(username: username, password: 'password', role: 'admin')
  10.times do
    start_date = Faker::Date.between(1.months.ago, 2.months.from_now)
    Trip.create!(
      :user_id => user.id,
      :destination => Faker::Nation.capital_city,
      :comment => Faker::Lorem.paragraph,
      :start_date => start_date,
      :end_date => Faker::Date.between(start_date + 2.days, start_date + 2.weeks),
    )
  end
end

100.times do
  username = Faker::Name.name.split.join('_')
  user = User.create(username: username, password: 'password')
  10.times do
    start_date = Faker::Date.between(1.months.ago, 2.months.from_now)
    Trip.create!(
      :user_id => user.id,
      :destination => Faker::Nation.capital_city,
      :comment => Faker::Lorem.paragraph,
      :start_date => start_date,
      :end_date => Faker::Date.between(start_date + 2.days, start_date + 2.weeks),
    )
  end
end