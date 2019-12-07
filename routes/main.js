var Router = require('koa-router');
var activityModel = require('../models/activities')

var router = Router({
   prefix: '/api/calendar/activities'
}); 

var bodyParser = require('koa-bodyparser');

//get all activities
router.get('/', async (cnx, next) => {
    let data = cnx.body = await activityModel.getAll();
    if (data === null) {
        cnx.body.response.status = 404;
        cnx.body = {message: "No existing activities were found!"}
    } else {
        cnx.body = data;
    }
  })

//create a new activity
router.post('/',bodyParser(), async (cnx,next) =>{
    //set variables for activity properties
    title = cnx.request.body.title;
    description = cnx.request.body.description;
    location = cnx.request.body.location;
    //valiation for activity properties
    if(title > 60 || title <= 0){ //title should be between 1 and 60 characters
        cnx.body = {message:"Please enter a valid title (1-60 characters)"}
    }else if(description > 300 || description <= 0){ //description should be between 1 and 300 characters
        cnx.body = {message:"Please enter a valid description (1-300 characters)"}
    }else if(location > 40 || location <= 0){ //location should be between 1 and 40 characters
        cnx.body = {message:"Please enter valid location (1-40 characters)"}
    }else{ //only after passing the above parameters will this execute
        let newActivity = {title:title, description:description, url:title +".activity", location:location};
        cnx.body = await activityModel.add(newActivity);
    }
} )

router.get('/:id([0-9]{1,})', async (cnx, next) =>{

    let id = cnx.params.id; //get tthe target id from the url
    cnx.body = await activityModel.getById(id);

})

router.put('/:id', bodyParser(), async (cnx, next) =>{
    console.log("hey I'm from the activities route!")
    let id = cnx.params.id;
    title = cnx.request.body.title;
    description = cnx.request.body.description;
    location = cnx.request.body.location;
    //valiation for activity properties
    // if(title > 60 || title <= 0){ //title should be between 1 and 60 characters
    //     cnx.body = {message:"Please enter a valid title"}
    // }else if(description > 300 || description <= 0){ //description should be between 1 and 300 characters
    //     cnx.body = {message:"Please enter a valid description"}
    // }else if(location > 40 || location <= 0){ //location should be between 1 and 40 characters
    //     cnx.body = {message:"Please enter valid input"}
    if( (title > 60 || title <= 0) && (description > 300 || description <= 0) && (location > 40 || location <= 0)){
        cnx.body = {message: "Please update at least one field"}
    }else{ //only after passing the above parameters will this execute
        //let updateActivity = {title:title, description:description, url:title + ".activity", location:location};
        cnx.body = await activityModel.update(id,cnx);
    }
})

router.del('/:id', bodyParser(), async (cnx,next) =>{

    let id = cnx.params.id;
    cnx.body = await activityModel.delete(id);
})

module.exports = router;