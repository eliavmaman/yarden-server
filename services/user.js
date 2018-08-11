const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const brain = require('brain.js');


module.exports = {
    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({email: email, password: password}, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.json({message: 'user not found'});
            }
            console.log(user.fname, 'connected to the store');
            return res.json(user);
        });
    },
    register: (req, res) => {
        let user = req.body;
        console.log('user-----' + JSON.stringify(user));
        let u = new User(user);
        u.save((err, user) => {
            if (err) throw err;
            console.log(user.fname, 'register to the store');
            return res.json(user);
        });
    },
    getUserOrders: (req, res) => {
        let id = req.params.id;
        Order.find({user: id}).populate('products').exec((err, orders) => {
            if (err) throw err;
            res.json(orders);
        });
    },
    list: (req, res) => {
        User.find({active: true}, (err, users) => {
            if (err) throw err;
            res.json(users);
        });
    },
    maps: (req, res) => {
        var locations = [
            ['Location 1 Name', 'New York, NY', 'Location 1 URL'],
            ['Location 2 Name', 'Newark, NJ', 'Location 2 URL'],
            ['Location 3 Name', 'Philadelphia, PA', 'Location 3 URL']
        ];
        res.json(locations);
    },

    update: (req, res) => {
        let pId = req.params.id;
        let password = req.body.password;

        User.findOne({_id: pId}, (err, user) => {
            if (err) throw err;

            user.password = password;

            user.save((err, newUser) => {
                if (err) throw err;

                res.json(newUser);
            });

        });
    },
    delete: (req, res) => {

        console.log('delete user' + req.params.id);
        let id = req.params.id;

        User.findOne({_id: id}, (err, u) => {
            if (err) throw err;

            u.active = false;

            u.save((err, user) => {
                if (err) throw err;

                res.json(user);
            });
        });

    },
    groupByGender: (req, res) => {
        User.aggregate([
            {
                $group: {
                    _id: "$gender",
                    count: {$sum: 1}
                }
            }]
        ).exec((err, users) => {
            if (err) throw err;
            res.json(users);
        })
    },
    getml: (req, res) => {
        let id = req.params.id;
        let userProducts = [];
        let trainData = [];

        Order.find({user: id}).populate('products').exec((err, orders) => {

            if (err) throw err;

            orders.forEach((o) => {
                console.log('start 1')
                o.products.forEach((p) => {
                    userProducts.push(p);
                    // trainData.push({input: {name: p.name, price: p.price}, output: {goodProduct: 1}});
                    trainData.push({input: p.name, output: 1});
                });

            })

            let allProducts = [];
            Product.find({}, (err, products) => {

                if (err) throw err;
                allProducts = products;
                products.forEach((p) => {
                    console.log('start 2')
                    var found = userProducts.filter((up) => {
                        return up._id == p._id;
                    });

                    if (!found) {
                        console.log('NOT EXIST ------' + JSON.stringify(p));
                        //trainData.push({input: {name: p.name, price: p.price}, output: {goodProduct: 0}});
                        //trainData.push({input: [p.price], output: [0]});
                    }
                })

                let net = new brain.NeuralNetwork();

                console.log('TRAIN DATA ___________');
                console.log(trainData);
                if (trainData.length>0) {
                    net.train(trainData);


                    let bestProduct;
                    let bestProductPredicate = 0;
                    let output;
                    allProducts.forEach((p) => {

                        console.log('test ------ ');
                        console.log({name: p.name, price: p.price});
                        //output = net.run({_id: p._id, name: p.name, price: p.price});
                        output = net.run(p.name);
                        console.log('output ------' + JSON.stringify(output));
                        if (output > bestProductPredicate) {
                            bestProductPredicate = output;
                            bestProduct = p;
                        }

                    });


                    console.log('best product-' + JSON.stringify(bestProduct));

                    res.json(bestProduct);
                }else{
                    res.json({});
                }

            });


        });


    },
};