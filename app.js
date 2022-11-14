const express = require('express');
const app = express();
const { getCategoryObjects, getReviewObjects } = require('./controllers/categories-controller.js');

app.use(express.json());

//GET
app.get('/api/categories', getCategoryObjects);
app.get('/api/reviews', getReviewObjects);

//Custom Errors
app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
    }
})

module.exports = app;