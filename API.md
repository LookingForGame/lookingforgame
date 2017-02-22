#####Routes

######/api/users

GET- responds with array of all users

POST- Adds a user returns the token for the new user

######/api/users/:username

GET- responds with a specific user

DELETE- Deletes a specific user

PUT-When passed a JSON updates the contained fields in DB and responds with an updated user

######/api/instances

GET- Gets an array of instances

POST- Adds an instance

######/api/instances/:instanceID

GET- responds with a specific instance

DELETE- Deletes a specific instance

PUT- When passed a JSON updates the contained fields in DB and responds with an updated instance

######/auth/login

POST- when passed a valid username and password responds with a token
