const route = require('express').Router();
const { createUser, loginUser, logoutUser, getUsageHistory } = require('../controllers/user.controller');

route.post('/user', createUser);

route.post('/login', loginUser);

route.post('/logout', logoutUser);

route.get('/user/history/:username', getUsageHistory);

module.exports = route;
