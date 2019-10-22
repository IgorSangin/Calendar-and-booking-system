var Router = require('koa-router');
var model = require('../models/admin.js')
var activityModel = require('../models/activities')

var router = Router({
   prefix: '/api/calender'
}); 

var bodyParser = require('koa-bodyparser');

router.get('/', (cnx, next) => {
    cnx.body = {message:'Testing page for Booking system'};
});

//create a new activity
router.post('/',bodyParser(), async (cnx,next) =>{
    //set variables for activity properties
    title = cnx.request.body.title;
    description = cnx.request.body.title;
    url = cnx.request.body.url;
    location = cnx.request.body.location;
    //valiation for activity properties
    if(title > 60 || title <= 0){ //title should be between 1 and 60 characters
        cnx.body = {message:"Please enter a valid title"}
    }else if(description > 300 || description <= 0){ //description should be between 1 and 300 characters
        cnx.body = {message:"Please enter a valid description"}
    }else if(url > 70 || url <= 0){ //url should be between 1 and 70 characters
        cnx.body = {message:"Please enter valid input"}
    }else if(location > 40 || location <= 0){ //location should be between 1 and 40 characters
        cnx.body = {message:"Please enter valid input"}
    }else{ //only after passing the above parameters will this execute
        let newActivity = {title:title, description:description, url:url, location:location};
        await activityModel.add(newActivity);
        cnx.body = {message:"Added successfully"}
    }
} )



module.exports = router;