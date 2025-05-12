const { publishToFeed } = require('../services/device.service');

module.exports = {
    publishToFeed: async (req, res) => {
        const feed_id = req.params.feed_id;
        const data = req.body.data;

        const result = await publishToFeed(req.client, feed_id, data);
        res.status(result.code).json(result.message);
    }
};