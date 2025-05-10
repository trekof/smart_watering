const mqtt = require('mqtt');
const {addARecord} = require('../services/record.service');
const {Adapter} = require('../cloud/mongoDB');

class MQTTAdafruitIO extends Adapter{
    constructor(username,key,options){
        super('MQTTAdafruitIO');
        this.username = username
        this.key = key
        this.url = `mqtts://${username}:${key}@io.adafruit.com`
        this.options = options
        this.client = null
    }

    connect(){
        this.client = mqtt.connect(this.url,this.options);
        this.client.on('connect', () => {
            console.log("Connected to Adafruit!")
        });
        this.client.on('message',async (topic, message, packet) => {
            console.log("Received '" + message + "' on '" + topic + "'");
            let recordInfo = {
                "value": message.toString(),
                "sensorName": topic.split("/")[2],
            }
            let result = await addARecord(recordInfo);
            console.log(result)
        });
        this.client.on('disconnect', () => {
            console.log("Disconnected to Adafruit!")
        })
    }

    subscribe(feed_id){
        this.client.subscribe(this.username + "/feeds/" + feed_id,()=>{
            console.log("Subscribed to " + feed_id)
        })
    }

    //fan, pump, led
    publish(feed_id,data){
        this.client.publish(this.username + "/feeds/" + feed_id,data,()=>{
            console.log("Published to " + feed_id + " : " + data);
        })
    }

}

module.exports = {MQTTAdafruitIO}