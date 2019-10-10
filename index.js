var Koa = require('koa');


var app = new Koa();

var main = require('./routes/main.js');

app.use(main.routes());



var port = process.env.PORT || 3000;
app.listen(port);
