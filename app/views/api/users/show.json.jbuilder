json.user do
  json.partial! '/api/users/user', trip: @user
end
