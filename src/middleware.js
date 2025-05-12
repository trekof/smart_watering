const { MQTTAdafruitIO } = require('./utils/adafruit_api');

const username = 'vanminhcs';
const key = 'aio_olch09QTymrXAu7FwuTCxZnLcqs8';
const options = { port: 8883 };

const client = new MQTTAdafruitIO(username, key, options);
client.connect();
client.subscribe('humid');
client.subscribe('soil');
client.subscribe('temperature');

function attachMQTTClient(req, res, next) {
    req.client = client;
    next();
}

module.exports = attachMQTTClient;