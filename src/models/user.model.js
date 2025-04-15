const mongoose = require('mongoose');

const LoginLogSchema = new mongoose.Schema({
    time: Date,
    status: String
}, { _id: false });

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    loginHistory: [LoginLogSchema]
}, {
    timestamps: true,
    collection: "users"
});

module.exports = mongoose.model('User', UserSchema);