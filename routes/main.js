var Router = require('koa-router');
var router = Router({
   prefix: '/api'
}); 


router.get('/', (cnx, next) => {
    cnx.body = {message:'Testing page for Booking system'};
});

module.exports = router;