const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema= new Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    price: Number,
    city: String,
    street: String,
    order_date: Date,
    delivery_date: Date,
    card_digits: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;