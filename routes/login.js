var Router = require('koa-router')
var model = require('../models/users');
var bodyParser = require('koa-bodyparser');
var passport = require('koa-passport');
var router = new Router({
    prefix: '/api/login'
})

router.post('/', bodyParser(), async (cnx, next) =>{

    //to protect the resource, only authenticated users can access it
    return passport.authenticate('basic', async function(err, user, info, status) {
       if(err){
         cnx.body = err
       }
       else if (user === false) {
        cnx.body = { success: false }
        cnx.throw(401)
       } else {
          let authData = cnx.params.authData;
          let data = await model.findOne(authData);
 
          if(data.length === 0){
             cnx.response.status = 404;
             cnx.body = {message:"user not found"}
          }
          else
             cnx.body = data;
          }
    })(cnx)
 });



module.exports = router;