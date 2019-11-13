'use strict'
var Router = require('koa-router');
var commentsModel = require('../models/comments')

var router = Router({
   prefix: '/api/calendar/comments'
}); 

var bodyParser = require('koa-bodyparser');

router.get('/', bodyParser(), async (cnx, next) => {
    try{
        let data = await commentsModel.get()
        cnx.body = data
        // return data
    }catch(error){
        cnx.body = {message:error.message}
    }
});

//create a new activity
router.post('/',bodyParser(), async (cnx,next) =>{
    let userId = "Carl"
    let activityId = "Carl"
    let allText = cnx.request.body.values.comment
    const d = new Date();
    console.log(allText);
    let dateCreated = d.getFullYear()+"-"+d.getMonth()+"-"
        +d.getDate()+" "+d.getHours()+":"+d.getMinutes()
        +":"+d.getSeconds();
        let newComment = {userId: userId, activityId: activityId, allText: allText, dateCreated: dateCreated}
    try{
        await commentsModel.add(newComment);
        cnx.response.status = 201;
        cnx.body = {message: "comment was added successfully"};
    }catch(error){
        cnx.response.status = error.status;
        cnx.body = {message:error.message};
    }
    
} )

router.get('/:id([0-9]{1,})', async (cnx, next) =>{

    let id = cnx.params.id; //get tthe target id from the url
    cnx.body = await activityModel.getById(id);

})

router.put('/:id', bodyParser(), async (cnx, next) =>{

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