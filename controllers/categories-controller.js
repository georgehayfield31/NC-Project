const { fetchCategoryObjects } = require('../models/category-models')

exports.getCategoryObjects = (req, res, next) => {
    fetchCategoryObjects().then((categories) => {
        console.log(categories.rows)
        res.status(200).send(categories.rows);
    });
}