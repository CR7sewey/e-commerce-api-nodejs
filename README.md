## Hosted Project

[E-Commerce API Render URL]
#### Setup Basic Express Server

- [] import express and assign to variable
- [] setup start port variable (5000) and start function

#### Connect To DB

- [] get connection string
- [] setup .env with MONGO_URL variable and assign the value
- [] import 'dotenv' and setup package
- [] import connect() and invoke in the starter
- [] restart the server
- [] mongoose V6 info

#### Basic Routes and Middleware

- [] setup / GET Route
- [] setup express.json() middleware
- [] setup 404 and errorHandler middleware
- [] import 'exress-async-errors' package

#### 404 vs ErrorHandler Middleware
- [] Order is important, if otherwise, we would obtain a wrong error for worng routes; The errorHandler only is activvated when we have an existing route!

#### Morgan Pacakge

- [Morgan Package](https://www.npmjs.com/package/morgan)

#### User Model

- [] create models folder and User.js file
- [] create schema with name,email, password (all type:String)
- [] export mongoose model

#### Validator Package

- [Validator](https://www.npmjs.com/package/validator)

#### Auth Routes Structure

- [] create controllers folder
- [] add authController file
- [] export (register,login,logout) functions
- [] res.send('some string value')
- [] create routes folder
- [] setup authRoutes file
- [] import all controllers
- [] setup three routes
- [] post('/register') post('/login') get('/logout')
- [] import authRoutes as authRouter in the app.js
- [] setup app.use('/api/v1/auth', authRouter)

#### Test Routes in Postman

#### Register Controller

- [] create user
- [] send response with entire user (only while testing)
- [] check if email already in use (schema and controller)
- [] ignore 'role'
- [] alternative 'admin' setup

#### Handle Password

- [] UserSchema.pre('save') - hook
- bcrypt.genSalt - number of rounds
- bcrypt.hash

#### JWT

- [] require 'jsonwebtoken' package
- [] create jwt - jwt.sign(payload,secret,options)
- [] verify jwt - jwt.verify(token,secret)
- [] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
- [] restart the server !!!!
- [] refactor code, create jwt functions in utils
- [] refactor cookie code
- [] setup func attachCookiesToResponse
- [] accept payload(res, tokenUser)
- [] create token, setup cookie
- [] optionally send back the response

#### Login Route

- [] check if email and password exist, if one missing return 400
- [] find user, if no user return 401
- [] check password, if does not match return 401
- [] if everything is correct, attach cookie
  and send back the same response as in register

#### Logout Route

- [] set token cookie equal to some string value
- [] set expires:new Date(Date.now())

### Some extra info about cookies and jwt 

- Please check test_frontend branch with the frontend folder
- https://www.freecodecamp.org/news/authenticate-users-node-app/
- Basically, the main diference in the frontend btw saving the token or using cookies is that when using cookies, you don't need to provide in the frontend the token to access the route, the cookie is directly transmited through the browser to the backend. When doing only jwt auth, in the frontend we usually do something like: localStorage.setItem("token", data.token); or get or even remove (localStorage.removeItem("token")). With cookies, this process is in charge of the backend, so the front don't have to do this work, bcs who rules the token in the cookies is the back (transmited directly through the network)
- In summary, or not, when using cookies, if you look at the local storage we don't have anything, bcs we dont need to do it in the front. That's also the advantge of it bcs you cant access it through the client side. However, it has a size limit!
- another note: cookies can only be resent to the same domain, which means if we are wornking with for example a create-react-app we are in a !== domain. For that, first enable cors to allow, then configurate the proxy (on frontend! with the server domain).

#### User Routes Structure

- [] add userController file
- [] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [] res.send('some string value')
- [] setup userRoutes file
- [] import all controllers
- [] setup just one route - router.route('/').get(getAllUsers);
- [] import userRoutes as routerUser in the app.js
- [] import tokenExists middleware in the app.js
- [] setup app.use('/api/v1/users', tokenExists, routerUser)

#### GetAllUsers and GetSingleUser

- [] Get all users where role is 'user' and remove password
- [] Get Single User where id matches id param and remove password
- [] If no user 404

#### Authenticate User Setup
- just refactoring

### Just a note to remember some forgotten js things
function ola({ ...oi }) {
  console.log(oi);
}
function ola2(...oi) {
  console.log(oi);
}

ola({ oi: { a: 1, b: 2 }, a: 1 });              -> { oi: { a: 1, b: 2 }, a: 1 }
ola2({ oi: { a: 1, b: 2 }, a: 1 }, 1, "ola");   -> [ { oi: { a: 1, b: 2 }, a: 1 }, 1, "ola" ]

#### ShowCurrentUser

- [] get user from req
- [] send response with user

#### UpdateUserPassword

- [] almost identical to login user
- [] add authenticateUser middleware in the route
- [] check for oldPassword and newPassword in the body
- [] if one missing 400
- [] look for user with req.user.userId
- [] check if oldPassword matches with user.comparePassword
- [] if no match 401
- [] if everything good set user.password equal to newPassword
- [] await user.save()

- Note: till this moment, considering my tests, there is no problem with the 
previously generated token (bcs only contains id, name and role); also for now
there is no a problem with req.user saved in the login, bcs in every route a the
req.user is updated considering the token (authtentication!) 

#### createTokenUser in Utils

- [] create a file in utils (createTokenUser)
- [] setup a function that accepts user object and returns userToken object
- [] export as default
- [] setup all the correct imports/exports and refactor existing code

#### updateUser with User.findOneAndUpdate()

- [] add authenticateUser middleware in the route
- [] check for name and email in the body
- [] if one is missing, send 400 (optional)
- [] use findOneAndUpdate()
- [] create token user, attachCookiesToResponse and send back the tokenUser
