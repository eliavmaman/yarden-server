const express = require('express');
const router = express.Router();
const userService = require('./services/user');
const categoryService = require('./services/category');
const productService = require('./services/product');
const orderService = require('./services/order');

const cors=require('cors');

router.all('*', cors());
// when route to /login the the func login in users.js will run
router.route('/login').post(userService.login);
// when route to /register the the func register in users.js will run
router.route('/register').post(userService.register);
//users

router.route('/users/:id').put(userService.update);
// categories
router.route('/categories').post(categoryService.create);
router.route('/categories').get(categoryService.list);
router.route('/categories/:id').get(categoryService.byId);
router.route('/categories/:id').put(categoryService.update);
router.route('/categories/:id').delete(categoryService.delete);

// products
router.route('/products').post(productService.create);

router.route('/products').get(productService.list);
router.route('/products/:id').get(productService.byId);
router.route('/products/:id').put(productService.update);
router.route('/prodbycat').get(productService.groupByCategory);


// order
router.route('/orders').post(orderService.create);
router.route('/orders').get(orderService.list);
router.route('/ordersByDate').post(orderService.ordersByDate);
router.route('/orders/:id').get(orderService.byId);
router.route('/orders/:id').put(orderService.update);
router.route('/getMostRecommandedProduct/:id').get(orderService.getMostRecommandedProduct);

// users
router.route('/users').post(userService.register);
router.route('/users').get(userService.list);
router.route('/users/:id/orders').get(userService.getUserOrders);
router.route('/users/:id').put(userService.update);
router.route('/users/:id').delete(userService.delete);
router.route('/users/:id/getml').get(userService.getml);
router.route('/groupByGender').get(userService.groupByGender);
//MAPS
router.route('/maps').get(userService.maps);


module.exports = router;