const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    local: {
        login: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    } 
});

UserSchema.methods.validPassword = function(password) {
    return this.local.password === password;
};

module.exports = mongoose.model('User', UserSchema);