const {db} = require('../db/connection.js');

exports.fetchCategoryObjects = () => {
    return db.query("SELECT * FROM categories;").then((result) => {
        return result.rows;
    })
};


exports.fetchReviewById = (review_id) => {
    return db.query("SELECT * FROM reviews WHERE review_id = $1", [review_id]).then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Review not found!'});
        }
        return result.rows[0];
    })
};

exports.fetchReviewObjects = () => {
    return db.query(`SELECT reviews.review_id, reviews.title, reviews.category, 
                    reviews.designer, reviews.owner, reviews.review_img_url, 
                    reviews.created_at, reviews.votes, 
                    COUNT(comments.comment_id)::Int AS comment_count 
                    FROM reviews
                    LEFT JOIN comments ON 
                    reviews.review_id = comments.review_id
                    GROUP BY reviews.review_id
                    ORDER BY reviews.created_at DESC;`).then((review) => {
        return review.rows;
    })
};

