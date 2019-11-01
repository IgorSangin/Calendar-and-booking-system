var Router = require('koa-router')
var model = require('../models/users');
var bodyParser = require('koa-bodyparser');
var router = new Router({
    prefix: '/api/login'
})

router.get('/:id([0-9]{1,})', async (cnx, next) =>{

    //to protect the resource, only authenticated users can access it
    return passport.authenticate('basic', async function(err, user, info, status) {
       if(err){
         cnx.body = err
       }
       else if (user === false) {
        cnx.body = { success: false }
        cnx.throw(401)
       } else {
          let id = cnx.params.id;
          let data = await model.getById(id);
 
          if(data.length === 0){
             cnx.response.status = 404;
             cnx.body = {message:"user not found"}
          }
          else
             cnx.body = data;
          }
    })(cnx)
 });

router.post('/', bodyParser(), async (cnx, next) => {
    console.log(cnx.request.body)
    
    let currentUser = {
        username : cnx.request.body.values === undefined ? undefined: cnx.request.body.values.username, 
        password : cnx.request.body.values === undefined ? undefined: cnx.request.body.values.password,
    };
   try{
    await model.findOne(currentUser);
    cnx.response.status = 201;
    cnx.body = {message:"Logged in successfully"};
 }
 catch(error){
    cnx.response.status = error.status;
    cnx.body = {message:error.message};
 }
});


module.exports = router;