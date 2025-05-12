const route = require('express').Router()
const {createUserLogin} = require('../controllers/user.controller')

//route.post('/userlogin',loginUser)
route.post('/userreg', createUserLogin)

module.exports = route
