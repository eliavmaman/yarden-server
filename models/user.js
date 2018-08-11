var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    role: {type: String, default: 'user'},
    active: {type: Boolean, default: true},
    gender: {type: String, default: 'Male'}
});

module.exports = mongoose.model('User', UserSchema);
