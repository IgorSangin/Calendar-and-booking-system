var Koa = require('koa');


var app = new Koa();

var main = require('./routes/main.js');
var admin = require('./routes/admin');

app.use(main.routes());
app.use(admin.routes());


var port = process.env.PORT || 3000;
app.listen(port);
