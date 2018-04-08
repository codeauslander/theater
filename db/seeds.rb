# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Cinema.create!({})

Movie.create!([
  { 
    cinema_id: 1, 
    name: "movie_1", 
    showtime: DateTime.new(2018,11,19,8,37,48,"-06:00"), 
    duration: 2, 
    seats: 50
  },
  { 
    cinema_id: 1, 
    name: "movie_1", 
    showtime: DateTime.new(2019,11,19,8,37,48,"-06:00"), 
    duration: 3, 
    seats: 50
  },
])

User.create!({
    name: "name_1",
    email: "e@e.com",
    password_digest: "password"
  })

Order.create!(
  {
    user_id: 1,
    credit_card: "1234",
    expiration_date: DateTime.new(2022,11,19,8,37,48,"-06:00")
  }
)

Ticket.create!([
  {
    movie_id: 1,
    order_id: 1,
    price: 100,
  },
  {
    movie_id: 2,
    order_id: 1,
    price: 100,
  }
])

