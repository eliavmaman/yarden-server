const Order = require('../models/order');

module.exports = {
    create: (req, res) => {
        let order = req.body;
        let p = new Order(order);

        p.save((err, order) => {
            if (err) throw err;

            res.json(order);
        });
    },
    list: (req, res) => {
        Order.find().populate('products').exec((err, order) => {
            if (err) throw err;

            res.json(order);
        });
    },
    ordersByDate: (req, res) => {
        let from = req.body.from;
        let to = req.body.to;
        Order.find({order_date: {$gte: new Date(from), $lte: new Date(to)}}, (err, orders) => {
            if (err) throw err;

            res.json(orders);
        });
    },
    byId: (req, res) => {
        let pId = req.params.id;

        Order.findOne({_id: pId}).populate('category', 'name').exec((err, order) => {
            if (err) throw err;

            res.json(order);
        });
    },
    update: (req, res) => {
        let pId = req.params.id;
        let order = req.body;

        Order.findOne({_id: pId}, (err, o) => {
            if (err) throw err;

            o.user = order.user;
            o.products = order.products;
            o.price = order.price;
            o.order_date = order.order_date;
            o.card_digits = order.card_digits;

            o.save((err, newOrder) => {
                if (err) throw err;

                res.json(newOrder);
            });

        });
    },
    getMostRecommandedProduct: (req, res) => {
        let pId = req.params.id;


        Order.find({_id: pId}, (err, orders) => {
            if (err) throw err;
            let allprods = [];
            orders.forEach((o) => {
                o.products.forEach((p) => {
                    if (pInAllProducts(p)) {
                        allprods[p.name]++;
                    } else {
                        allprods[p.name] = 0;
                    }
                })
            });
            console.log(allprods);
            var max = Object.keys(allprods).reduce((a, b) => allprods[a] > allprods[b] ? a : b);
            console.log(max);

        });
    },


};