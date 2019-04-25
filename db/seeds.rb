# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Trip.delete_all
User.delete_all

user1 = User.create!(:username => "user1", :password => "password")
Trip.create!(
  :user_id => user1.id,
  :destination => "Seattle",
  :comment => "Starbucks was fun",
  :start_date => Date.new(2018,12,31),
  :end_date => Date.new(2019,1,7),
)
Trip.create!(
  :user_id => user1.id,
  :destination => "Oakland and Death Valley",
  :comment => "Scootered in Oakland and went into the basin in Death Valley",
  :start_date => Date.new(2019,1,7),
  :end_date => Date.new(2019,1,14),
)
Trip.create!(
  :user_id => user1.id,
  :destination => "Zurich",
  :comment => "Hanging out with Lin",
  :start_date => Date.new(2019,1,15),
  :end_date => Date.new(2019,1,16),
)
Trip.create!(
  :user_id => user1.id,
  :destination => "Kenya",
  :comment => "Running with the Kenyans",
  :start_date => Date.new(2019,1,17),
  :end_date => Date.new(2019,2,16),
)
