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

//create a new comment
router.post('/',bodyParser(), async (cnx,next) =>{
    let userId = "Carl"
    let activityId = "Carl"
    let allText = cnx.request.body.values.comment
    const d = new Date();
    console.log("I am post comment route")
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

// router.get('/:id([0-9]{1,})', async (cnx, next) =>{

//     let id = cnx.params.id; //get tthe target id from the url
//     cnx.body = await activityModel.getById(id);

// })

router.put('/:id',bodyParser(), async (cnx, next) =>{
    let Id = cnx.params.id
    let userId = "Carl"
    let activityId = "Carl"
    let allText = cnx.request.body.values.newComment
    const d = new Date();
    console.log(Id)
    console.log(allText)
    let dateModified = d.getFullYear()+"-"+d.getMonth()+"-"
        +d.getDate()+" "+d.getHours()+":"+d.getMinutes()
        +":"+d.getSeconds();
        let newComment = {Id: Id, userId: userId, activityId: activityId, allText: allText, dateModified: dateModified}
    try{
        await commentsModel.update(newComment);
        cnx.response.status = 201;
        cnx.body = {message: "comment was updated successfully"};
    }catch(error){
        cnx.response.status = error.status;
        cnx.body = {message:error.message};
    }
})

// router.del('/:id', bodyParser(), async (cnx,next) =>{

//     let id = cnx.params.id;
//     cnx.body = await activityModel.delete(id);
// })

module.exports = router;