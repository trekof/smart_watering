const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('\x1b[32m%s\x1b[0m', 'Connected to MongoDB successfully!');  // Hiển thị màu xanh nếu kết nối thành công
// }).catch(err => {
//     console.error('\x1b[31m%s\x1b[0m', `Error connecting to MongoDB: ${err.message}`); // Hiển thị màu đỏ nếu kết nối thất bại
//     process.exit(1);  // Dừng ứng dụng nếu không thể kết nối đến MongoDB
// });

// module.exports = mongoose;

const mqtt = require('mqtt');
const {addARecord} = require('../services/record.service');

class MongoAdapter {
    constructor(uri, dbName, collectionName) {
        // super();
        this.uri = uri;
        this.dbName = dbName;
        this.collectionName = collectionName;
        //this.SensorModel = null;
      }
    
    async connect(){
        await mongoose.connect(this.uri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }).then(() => {
            console.log('\x1b[32m%s\x1b[0m', 'Connected to MongoDB successfully!');  // Hiển thị màu xanh nếu kết nối thành công
        }).catch(err => {
            console.error('\x1b[31m%s\x1b[0m', `Error connecting to MongoDB: ${err.message}`); // Hiển thị màu đỏ nếu kết nối thất bại
            process.exit(1);  // Dừng ứng dụng nếu không thể kết nối đến MongoDB
        });
    }
}

module.exports = {MongoAdapter}