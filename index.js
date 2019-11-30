var Koa = require('koa');


var app = new Koa();
const cors = require('@koa/cors');
const passport = require('koa-passport');


var admin = require('./routes/admin.js');
<<<<<<< HEAD
var users = require('./routes/users.js')
const main = require('./routes/main.js');
const comments = require('./routes/comments.js');
=======
var users = require('./routes/users.js');
var login = require('./routes/login.js');
var main = require('./routes/main.js');
var comments = require('./routes/comments.js');
>>>>>>> login

app.use(cors());
app.use(admin.routes());
app.use(users.routes());
<<<<<<< HEAD
=======
app.use(login.routes());
>>>>>>> login
app.use(main.routes());
app.use(comments.routes());

//this import will run the code in the auth.js
require('./auth');
app.use(passport.initialize());


var port = process.env.PORT || 3000;
app.listen(port);
