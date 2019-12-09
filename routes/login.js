const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const router = new Router({
  prefix: '/api/login',
});

router.post('/', bodyParser(), async (cnx, next) =>

  // to protect the resource, only authenticated users can access it
  passport.authenticate('basic', async (err, user, info, status) => {
    if (err) {
      cnx.body = err;
    } else if (user === false) {
      cnx.body = { success: false };
      cnx.throw(401);
    } else {
      cnx.body = user;
      console.log(user);
    }
  })(cnx));


module.exports = router;
