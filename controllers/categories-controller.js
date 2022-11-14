const { fetchCategoryObjects, fetchReviewObjects } = require('../models/category-models')

exports.getCategoryObjects = (req, res, next) => {
    fetchCategoryObjects().then((categories) => {
        res.status(200).send(categories);
    });
}

exports.getReviewObjects = (req, res, next) => {
    fetchReviewObjects().then((reviews) => {
        res.status(200).send(reviews);
    });
}