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
        console.log("Incorrect")
        cnx.throw(401)
       } else {
             cnx.body = user;
             console.log(user)
          }
    })(cnx)
 });



module.exports = router;