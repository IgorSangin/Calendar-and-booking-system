
const Router = require('koa-router');
const commentsModel = require('../models/comments');

var bodyParser = require('koa-bodyparser');

const router = new Router({
  prefix: '/api/calendar/comments',
});

router.get('/', bodyParser(), async (cnx, next) => {
    try{
        //calls the model for the exports.get method
        let data = await commentsModel.get()
        //saves the result the result to cnx.body which get passed to the frontend
        cnx.body = data
        // return data
    }catch(error){
        cnx.body = {message:error.message}
    }
});

//create a new comment
router.post('/',bodyParser(), async (cnx,next) =>{
    let userId = "Igor"
    let activityId = "Carl"
    //gets the comment from the comment box in the frontend
    let allText = cnx.request.body.values.comment
    const d = new Date();
    //current date & time is saved
    let dateCreated = d.getFullYear()+"-"+d.getMonth()+"-"
        +d.getDate()+" "+d.getHours()+":"+d.getMinutes()
        +":"+d.getSeconds();
        //creates new array for comment
        let newComment = {userId: userId, activityId: activityId, allText: allText, dateCreated: dateCreated}
    try{
        //call comments model for exports.add
        await commentsModel.add(newComment);
        cnx.response.status = 201;
        cnx.body = {message: "comment was added successfully"};
    }catch(error){
        cnx.response.status = error.status;
        cnx.body = {message:error.message};
    }
    
} )

router.get('/', bodyParser(), async (cnx, next) => {
  try {
    const data = await commentsModel.get();
    cnx.body = data;
    // return data
  } catch (error) {
    cnx.body = { message: error.message };
  }
});

// create a new comment
router.post('/', bodyParser(), async (cnx, next) => {
  const userId = 'Carl';
  const activityId = 'Carl';
  const allText = cnx.request.body.values.comment;
  const d = new Date();
  console.log('I am post comment route');
  console.log(allText);
  const dateCreated = `${d.getFullYear()}-${d.getMonth()}-${
    d.getDate()} ${d.getHours()}:${d.getMinutes()
  }:${d.getSeconds()}`;
  const newComment = {
    userId, activityId, allText, dateCreated,
  };
  try {
    await commentsModel.add(newComment);
    cnx.response.status = 201;
    cnx.body = { message: 'comment was added successfully' };
  } catch (error) {
    cnx.response.status = error.status;
    cnx.body = { message: error.message };
  }
});

// get a comment by id
router.get('/:id([0-9]{1,})', async (cnx, next) => {
  const { id } = cnx.params; // get the target id from the url
  cnx.body = await commentsModel.getById(id);
});

router.put('/:id',bodyParser(), async (cnx, next) =>{
    //gets the id from the URL in the fetch request
    let Id = cnx.params.id
    //gets the comment from the comment box in the frontend
    let allText = cnx.request.body.values.newComment
    const d = new Date();
     //current date & time is saved
    let dateModified = d.getFullYear()+"-"+d.getMonth()+"-"
        +d.getDate()+" "+d.getHours()+":"+d.getMinutes()
        +":"+d.getSeconds();
        let newComment = {Id: Id, allText: allText, dateModified: dateModified}
    try{
        //calls the comments model for exports.update
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
