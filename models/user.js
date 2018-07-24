var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    role: {type: String, default: 'user'},
    active: {type: Boolean, default: true}
});

module.exports = mongoose.model('User', UserSchema);
