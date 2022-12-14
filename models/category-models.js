const {db} = require('../db/connection.js');

exports.fetchCategoryObjects = () => {
    return db.query("SELECT * FROM categories;").then((result) => {
        return result.rows;
    })
};

exports.fetchReviewById = (review_id) => {
    return db.query(`SELECT reviews.review_id, reviews.title, reviews.category, reviews.review_body, 
                    reviews.designer, reviews.owner, reviews.review_img_url, 
                    reviews.created_at, reviews.votes, 
                    COUNT(comments.comment_id)::Int AS comment_count 
                    FROM reviews
                    LEFT JOIN comments ON 
                    reviews.review_id = comments.review_id
                    WHERE reviews.review_id = $1 
                    GROUP BY reviews.review_id;`, [review_id])
            .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Review not found!'});
        }
        return result.rows[0];
    })
};

exports.fetchReviewObjects = (sort_by = 'created_at', order = 'DESC', category) => {
    const validReviewSort = ['review_id', 'title', 'category', 'designer', 'owner', 'review_img_url', 'created_at', 'votes', 'body']
    const validReviewOrder = ['ASC','DESC']

    if (!validReviewSort.includes(sort_by)){
        return Promise.reject({status: 400, msg: 'Invalid query!'})
    } else if (!validReviewOrder.includes(order)) {
         return Promise.reject({status: 400, msg: 'Invalid query!'})
    }

    if (sort_by === "review_id") {
        sort_by = "reviews.review_id";
      }
      if (sort_by === "created_at") {
        sort_by = "reviews.created_at";
      }
      if (sort_by === "votes") {
        sort_by = "reviews.votes";
      }
      if (sort_by === "title") {
        sort_by = "title::bytea";
      }
      if (sort_by === "designer") {
        sort_by = "designer::bytea";
      }
      if (sort_by === "review_body") {
        sort_by = "title::bytea";
      }

    let query = `
                SELECT reviews.review_id, reviews.title, reviews.category, 
                reviews.designer, reviews.owner, reviews.review_img_url, 
                reviews.created_at, reviews.votes, 
                COUNT(comments.comment_id)::Int AS comment_count 
                FROM reviews
                LEFT JOIN comments ON 
                reviews.review_id = comments.review_id` 
    const queryValues = []

    if(category){
        query += ' WHERE reviews.category = $1';
        queryValues.push(category)
    }
    query += ` GROUP BY reviews.review_id ORDER BY ${sort_by} ${order};`
 
    return db.query(query, queryValues).then((reviews) => {
        return reviews.rows;
    })
};

exports.fetchCommentsByReviewId = (review_id) => {
    return db.query(`SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC;`, [review_id]).then((comments) => {
        return comments.rows;
    })
};

exports.createCommentByReviewId = (review_id, body, username, date) => {
    return db.query(`INSERT INTO comments (body, review_id, author, votes, created_at)
                     VALUES ($1, $2, $3, $4, $5)
                     RETURNING *`, [body, review_id, username, 0, date])
                     .then((comment) => {
                        return comment.rows[0];
                     })
}

exports.updateReviewByReviewId = (review_id, newVote) => {
    return db.query(`UPDATE reviews SET votes = votes + $1 WHERE review_id=$2 RETURNING *`, [newVote, review_id])
    .then((review) => {
        return review.rows[0];
    })
}

exports.fetchUsers = () => {
    return db.query(`SELECT * FROM users;`)
    .then((users) => {
        return users.rows;
    })
}

exports.removeCommentById = (comment_id) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [comment_id]).then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Comment not found!'});
        }
    })
}
