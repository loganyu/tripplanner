# README

## REST API
The domain for REST API endpoints is:
https://travelplanner-logan.herokuapp.com/api/

Endpoints:
### POST auth/login
params: username, password  
This request returns a token and user_id and expiration time of the token. Tokens expire in 24 hours. Tokens can be used to make api reqests by placing the authorization token in the header

```
curl -X POST -F 'username=loganyu' -F 'password=password' http://travelplanner-logan.herokuapp.com/api/auth/login

{"token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3ODczNX0.CUFjUWBKnjY7DSXCRWXW6FHC9kcx15ZBNstLin6-HVY",
  "exp":"04-29-2019 23:58",
  "user_id":448}
```

### GET users
```
curl -H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3ODczNX0.CUFjUWBKnjY7DSXCRWXW6FHC9kcx15ZBNstLin6-HVY" \
http://travelplanner-logan.herokuapp.com/api/users/

{"449":{"id":449,"username":"Belkis_Davis","role":"manager"},"450":{"id":450,"username":"Mr._Genaro_Dooley","role":"manager"},"451":{"id":451,"username":"Demetrius_Powlowski","role":"manager"},"452":{"id":452,"username":"Mignon_Ziemann","role":"manager"},...}
```

### GET users/user_id
```
curl -H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3ODczNX0.CUFjUWBKnjY7DSXCRWXW6FHC9kcx15ZBNstLin6-HVY" \
http://travelplanner-logan.herokuapp.com/api/users/448

{"id":448,"username":"loganyu","role":"admin"
```

### PUT users/user_id
params: {user: {username (optional), password(optional)}}
```
curl -d '{"user":{"username":"logan", "password":"password"}}' \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3NzkxMX0.NqilBOtupDVV3yBO9yJCAKN5fum0i-uT2cYmyxKvPhI" \
 -X PUT http://travelplanner-logan.herokuapp.com/api/users/448
```

### DELETE users/user_id
```
curl \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3NzkxMX0.NqilBOtupDVV3yBO9yJCAKN5fum0i-uT2cYmyxKvPhI" \
 -X DELETE http://travelplanner-logan.herokuapp.com/api/users/490

{"message":"delete successful"}
```

### GET users/user_id/trips
```
curl -H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3ODczNX0.CUFjUWBKnjY7DSXCRWXW6FHC9kcx15ZBNstLin6-HVY" \
http://travelplanner-logan.herokuapp.com/api/users/448/trips

{"3754":{"id":3754,"destination":"Seattle","comment":"Starbucks was fun","start_date":"2018-12-31","end_date":"2019-01-07"},"3755":{"id":3755,"destination":"Oakland and Death Valley","comment":"Scootered in Oakland and went into the basin in Death Valley","start_date":"2019-01-07","end_date":"2019-01-14"},"3756":{"id":3756,"destination":"Zurichjkl","comment":"Hanging out with Lin","start_date":"2019-01-15","end_date":"2019-01-16"},"3757":{"id":3757,"destination":"Kenyaasfsafdlsa","comment":"Running with the Kenyans","start_date":"2019-01-17","end_date":"2019-02-16"}}
```

### GET users/user_id/trips/trip_id
```
curl -H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3ODczNX0.CUFjUWBKnjY7DSXCRWXW6FHC9kcx15ZBNstLin6-HVY" \
http://travelplanner-logan.herokuapp.com/api/users/448/trips/3754

{"trip":{"id":3754,"destination":"Seattle","comment":"Starbucks was fun","start_date":"2018-12-31","end_date":"2019-01-07"}}
```

### PUT users/user_id/trips/trip_id
params: {trip: {destination (optional), comment(optional), start_date(optional), end_date (optional)}}
```
curl -d '{"trip":{"destination":"Portland", "comment":"Go a little south instead", "start_date":"2019-01-01", "end_date":"2019-01-09"}}' \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3NzkxMX0.NqilBOtupDVV3yBO9yJCAKN5fum0i-uT2cYmyxKvPhI" \
 -X PUT http://travelplanner-logan.herokuapp.com/api/users/448/trips/3754

 {"trip":{"id":3754,"destination":"Portland","comment":"Go a little south instead","start_date":"2019-01-01","end_date":"2019-01-09"}}
```

### POST users/user_id/trips
params: {trip: {destination, comment(optional), start_date, end_date}}
```
curl -d '{"trip":{"destination":"Cruise", "comment":"Shes never has avocado before. Can you believe that?", "start_date":"2019-02-01", "end_date":"2019-02-09"}}' \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDgsImV4cCI6MTU1NjU3NzkxMX0.NqilBOtupDVV3yBO9yJCAKN5fum0i-uT2cYmyxKvPhI" \
 -X POST http://travelplanner-logan.herokuapp.com/api/users/448/trips

{"trip":{"id":4858,"destination":"Cruise","comment":"Shes never has avocado before. Can you believe that?","start_date":"2019-02-01","end_date":"2019-02-09"}}
 ```
 