const Router = require('koa-router');
const adminModel = require('../models/admin');

const router = Router({
  prefix: '/api/admin',
});

const bodyParser = require('koa-bodyparser');

router.post('/create_db', async (ctx, next) => {
  const item = await adminModel.createTables(ctx.params.id);
  ctx.body = item;
});

module.exports = router;
