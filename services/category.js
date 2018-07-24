const Category = require('../models/category');

module.exports = {
    create: (req, res) => {
        let category = req.body;
        let c = new Category(category);

        c.save((err, category) => {
            if (err) throw err;
            res.json(category);
        });
    },
    list: (req, res) => {
        Category.find((err, categories) => {
            if (err) throw err;
            res.json(categories);
        });
    },
    byId: (req, res) => {
        let catId = req.params.id;
        console.log(catId);
        Category.findOne({_id: catId}, (err, category) => {
            if (err) throw err;
            res.json(category);
        });
    },
    update: (req, res) => {
        let catId = req.params.id;
        let category = req.body;

        console.log(category);

        Category.findOne({_id: catId}, (err, c) => {
            if (err) throw err;

            c.name = category.name;

            c.save((err, newCategory) => {
                if (err) throw err;

                res.json(newCategory);
            });
        });

    }
};