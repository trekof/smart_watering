const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
require('./cloud/mongoDB')
const {MongoAdapter} = require("./cloud/mongoDB")
const app = express()
const {MQTTAdafruitIO} = require('./utils/adafruit_api')

// const username = 'Heo_Rey'
// const key = 'aio_dKJy32dJkMvsexDDgdoVbYTPNqxU'
// const options = {
//     port: 8883
// }
const mongoAdapter = new MongoAdapter(
    process.env.MONGODB_URL,
    "",
    ""
)
mongoAdapter.connect();

const username = 'vanminhcs'
const key = 'aio_sVlH42UScmGqBHFpysEWi8W7Rmjj'
const options = {
    port: 8883
}

let client = new MQTTAdafruitIO(username,key,options)


client.connect()
client.subscribe('humid')
client.subscribe('soil')
client.subscribe('temperature')



// add some useful middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/api/publish/:feed_id', async (req, res) => {
    const feed_id = req.params.feed_id;
    const data = req.body.data
    client.publish(feed_id, data)
})
//add routes
app.use(require('./routes/user.route'))
app.use(require('./routes/userlogin.route'))
app.use(require('./routes/record.route'))
app.use(require('./routes/activity.route'))
app.use(require('./routes/notification.route'))


function RunServer(){
    app.listen(process.env.PORT || 8001, () => {
        console.log('Server is running in port ' + (process.env.PORT || 8001))
    })
}

module.exports = {RunServer}
