
const Router = require('koa-router');
const commentsModel = require('../models/comments');

const router = Router({
  prefix: '/api/calendar/comments',
});

const bodyParser = require('koa-bodyparser');

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
  const { id } = cnx.params; // get tthe target id from the url
  cnx.body = await commentsModel.getById(id);
});

router.put('/:id', bodyParser(), async (cnx, next) => {
  const Id = cnx.params.id;
  const userId = 'Carl';
  const activityId = 'Carl';
  const allText = cnx.request.body.values.newComment;
  const d = new Date();
  console.log(Id);
  console.log(allText);
  const dateModified = `${d.getFullYear()}-${d.getMonth()}-${
    d.getDate()} ${d.getHours()}:${d.getMinutes()
  }:${d.getSeconds()}`;
  const newComment = {
    Id, userId, activityId, allText, dateModified,
  };
  try {
    await commentsModel.update(newComment);
    cnx.response.status = 201;
    cnx.body = { message: 'comment was updated successfully' };
  } catch (error) {
    cnx.response.status = error.status;
    cnx.body = { message: error.message };
  }
});

// router.del('/:id', bodyParser(), async (cnx,next) =>{

//     let id = cnx.params.id;
//     cnx.body = await activityModel.delete(id);
// })

module.exports = router;
