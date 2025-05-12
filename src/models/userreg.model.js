const mongoose = require('mongoose')

const UserRegSchema = new mongoose.Schema({
    username: String,
    password: String,
},{
    timestamps: true,
    collection: "usersreg"
})

module.exports = mongoose.model('UserReg', UserRegSchema);