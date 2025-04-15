const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to Mongo DB')
    useNewUrlParser: true;
    useUnifiedTopology: true;
}).catch(err => console.log(err))

module.exports = mongoose;