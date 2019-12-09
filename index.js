const Koa = require('koa');


const app = new Koa();
const cors = require('@koa/cors');
const passport = require('koa-passport');

// import all the routes
const admin = require('./routes/admin.js');
const users = require('./routes/users.js');
const login = require('./routes/login.js');
const main = require('./routes/main.js');
const comments = require('./routes/comments.js');

// apply the routes as a middleware
app.use(cors());
app.use(admin.routes());
app.use(users.routes());
app.use(login.routes());
app.use(main.routes());
app.use(comments.routes());

// this import will run the code in the auth.js
require('./auth');

app.use(passport.initialize());


const port = process.env.PORT || 3000;
app.listen(port);
