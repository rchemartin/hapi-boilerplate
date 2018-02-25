# hapi-boilerplate

Forked from https://github.com/throrin19/hapi-boilerplate

Made by Romain Chemartin

Contains encrypt module from TP2 ([@romainch87/encrypt](https://www.npmjs.com/package/@romainch87/encrypt))

# Requirements

* [NodeJs and NPM](https://nodejs.org/en/)
* Following Env Variables :
```
MONGO_HOST=localhost;
MONGO_NAME=filRouge;
MAIL_USER=(email adress) 
MAIL_PASSWORD=(mail password)
```
I created a test email, that you can use : boilerplatenode@gmail.com / nodejs87


# Launch server

```
node server.js
```
Then go to

```
http://0.0.0.0:8080
```

And you'll have the following result :

```json
{"result":"vous êtes connectés"}
```

# Available routes

Here is a list of the routes that were required for the project (Full list available on the console after the ``node server.js``command)

```
POST             /login                         none                 Log in
POST             /password/reset/{_id}          none                 Resets user password
POST             /user                          none                 Create user
GET              /user/{_id}                    none                 Get users
PUT              /user/{_id}                    none                 Update user
GET              /user/all                      none                 Get users
DELETE           /user/delete/{_id}             none                 Deletes a specified user
PUT              /users/generate                none                 Generate 100 users
```

# Missing from the project

Some test are missing, because of errors, or lack of time 
(for example when we create random users, sometimes the informations given by faker doesn't correspond to the required format. I didn't manage to handle the error...)