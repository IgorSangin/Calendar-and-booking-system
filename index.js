var Koa = require('koa');


var app = new Koa();

const cors = require('@koa/cors');

var main = require('./routes/main.js');
var admin = require('./routes/admin');

app.use(cors());
app.use(main.routes());
app.use(admin.routes());


var port = process.env.PORT || 3000;
app.listen(port);
