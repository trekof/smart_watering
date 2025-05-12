const route = require('express').Router()
const { publishToFeed } = require('../controllers/device.controller');

route.post('/api/publish/:feed_id', publishToFeed);

module.exports = route;