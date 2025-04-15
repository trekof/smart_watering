const route = require('express').Router();
const { createUser, loginUser, logoutUser } = require('../controllers/user.controller');

route.post('/user', createUser);

route.post('/login', loginUser);

route.post('/logout', logoutUser);

module.exports = route;
