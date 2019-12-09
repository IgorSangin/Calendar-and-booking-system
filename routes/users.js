
const Router = require('koa-router');
const model = require('../models/users');

const router = Router({
  prefix: '/api/users',
});

// because we are going to parse POST parameters we will import koa-bodyparser
const bodyParser = require('koa-bodyparser');

// the id should be a number greater than or equal 1
router.get('/:id([0-9]{1,})', async (cnx, next) =>

  // to protect the resource, only authenticated users can access it
  passport.authenticate('basic', async (err, user, info, status) => {
    if (err) {
      cnx.body = err;
    } else if (user === false) {
      cnx.body = { success: false };
      cnx.throw(401);
    } else {
      const { id } = cnx.params;
      const data = await model.getById(id);

      if (data.length === 0) {
        cnx.response.status = 404;
        cnx.body = { message: 'user not found' };
      } else { cnx.body = data; }
    }
  })(cnx));

// note that we have injected the body parser onlyin the POST request
router.post('/', bodyParser(), async (cnx, next) => {
  console.log(cnx.request.body);

  // prevent server crash if values is undefined
  const newUser = {
    username: cnx.request.body.values === undefined ? undefined : cnx.request.body.values.username,
    password: cnx.request.body.values === undefined ? undefined : cnx.request.body.values.password,
    passwordConfirmation: cnx.request.body.values === undefined ? undefined : cnx.request.body.values.passwordConfirmation,
  };
  try {
    await model.add(newUser);
    cnx.response.status = 201;
    cnx.body = { message: 'user was added successfully' };
  } catch (error) {
    cnx.response.status = error.status;
    cnx.body = { message: error.message };
  }
});


module.exports = router;
