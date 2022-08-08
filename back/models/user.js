const mongoose = require('mongoose');

const roles = {
    administrator: process.env.ADMIN,
    user: process.env.USER
}
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: Number, required: true, default: roles.user}
});

module.exports = mongoose.model('User', userSchema);