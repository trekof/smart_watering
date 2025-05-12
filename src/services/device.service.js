

async function publishToFeed(client, feed_id, data) {
    try {
        await client.publish(feed_id, data);
        return {
            code: 200,
            message: { message: 'Successful' }
        };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            message: { message: 'Error', error: err.message }
        };
    }
}

module.exports = {
    publishToFeed
};