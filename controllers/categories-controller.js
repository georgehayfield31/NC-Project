const { fetchCategoryObjects, fetchReviewById } = require('../models/category-models')

exports.getCategoryObjects = (req, res, next) => {
    fetchCategoryObjects().then((categories) => {
        res.status(200).send(categories);
    });
}

exports.getReviewById = (req, res, next) => {
    const { review_id } = req.params;
    fetchReviewById(review_id).then((review) => {
        res.status(200).send(review);
    })
    .catch((err) => {
        next(err)
    });
}