const mongoose = require('mongoose');

const roles = {
    administrator: 2,
    user: 1
}
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: Number, required: true, default: roles.user}
});

module.exports = mongoose.model('User', userSchema);