if user.role.nil?
  json.extract! user, :id, :username
else
  json.extract! user, :id, :username, :role
end
