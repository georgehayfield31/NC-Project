const express = require('express');
const app = express();

const { getCategoryObjects, getReviewById, getReviewObjects, getCommentsByReviewId, postCommentByReviewId } = require('./controllers/categories-controller.js');

app.use(express.json());

//GET
app.get('/api/categories', getCategoryObjects);
app.get('/api/reviews', getReviewObjects);
app.get('/api/reviews/:review_id', getReviewById);
app.get('/api/reviews/:review_id/comments', getCommentsByReviewId);

//POST
app.post('/api/reviews/:review_id/comments', postCommentByReviewId);

//Error Handling
app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: 'Bad request!'});
    } else if(err.code === '23502'){
        res.status(400).send({msg: 'Incomplete Object!'});
    } else {
        next(err)
    }
})


//Custom Errors
app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
    }
})

module.exports = app;