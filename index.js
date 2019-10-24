var Koa = require('koa');


var app = new Koa();
const cors = require('@koa/cors');
const passport = require('koa-passport');


var admin = require('./routes/admin.js');
var users = require('./routes/users.js')

app.use(cors());
app.use(admin.routes());
app.use(users.routes());

//this import will run the code in the auth.js
require('./auth');
app.use(passport.initialize());


var port = process.env.PORT || 3000;
app.listen(port);
