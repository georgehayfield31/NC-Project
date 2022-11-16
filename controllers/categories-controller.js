const { fetchCategoryObjects, fetchReviewById, fetchReviewObjects, fetchCommentsByReviewId, createCommentByReviewId, updateReviewByReviewId, fetchUsers } = require('../models/category-models')

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

exports.postCommentByReviewId = (req, res, next) => {
    const { review_id } = req.params;
    const body = req.body.body;
    const username = req.body.author;
    const date = new Date(Date.now());
    fetchReviewById(review_id)
    .then(() => {
        return createCommentByReviewId(review_id, body, username, date)
    })
    .then((comment) => {
        res.status(201).send(comment)
    })
    .catch((err) => {
        next(err)
    })  
}

exports.patchReviewByReviewId = (req, res, next) => {
    const { review_id } = req.params;
    const newVote = req.body.inc_votes;
    fetchReviewById(review_id)
    .then(() => {
        return  updateReviewByReviewId(review_id, newVote)
    })
    .then((review) => {
        res.status(200).send(review)
    })
    .catch((err) => {
        next(err)
    })
}

exports.getUsers = (req, res, next) => {
    fetchUsers().then((users) => {
        res.status(200).send(users);
    })
}