const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log('\x1b[32m%s\x1b[0m', 'Connected to MongoDB successfully!');  
}).catch(err => {
    console.error('\x1b[31m%s\x1b[0m', `Error connecting to MongoDB: ${err.message}`);
    process.exit(1);  
});

module.exports = mongoose;
