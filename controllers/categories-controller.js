const { fetchCategoryObjects, fetchReviewById, fetchReviewObjects, fetchCommentsByReviewId } = require('../models/category-models')

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
    })
}
exports.getReviewObjects = (req, res, next) => {
    fetchReviewObjects().then((reviews) => {
        res.status(200).send(reviews);

    });
}

exports.getCommentsByReviewId = (req, res, next) => {
    const { review_id } = req.params;
    fetchReviewById(review_id)
    .then(() => {
        return fetchCommentsByReviewId(review_id)
    })
    .then((comments) => {
        res.status(200).send(comments)
    })
    .catch((err) => {
        next(err)
    })
}