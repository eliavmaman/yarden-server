const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    price: Number,
    order_date: Date,
    card_digits: String,
    is_bitcoin: {type: Boolean, default: false}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;