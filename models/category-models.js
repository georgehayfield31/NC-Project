const {db} = require('../db/connection.js');

exports.fetchCategoryObjects = () => {
    return db.query("SELECT * FROM categories;").then((result) => {
        return result.rows;
    })
};

exports.fetchReviewObjects = () => {
    return db.query(`SELECT reviews.review_id, reviews.title, reviews.category, 
                    reviews.designer, reviews.owner, reviews.review_body, reviews.review_img_url, 
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
