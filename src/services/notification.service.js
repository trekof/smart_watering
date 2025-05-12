const Notification = require('../models/notification.model')
const User = require('../models/user.model')

module.exports = {
    addANotification: async (notificationInfo) => {
        let notification = new Notification(notificationInfo);
        const existingUser = await User.find({ username: notificationInfo.userKey }).exec();
            if (existingUser.length > 0) {
                await notification.save();
                return {    
                    code: 200,
                    message: notificationInfo               
                };
            }
            else{
                return {
                    code:300,
                    message: 'User not found'
                };
            } 
    },

    getAllNotification: async (query) => {
        let result = null;
        if (query){
            result = await Notification.find().skip(query.offset).limit(query.limit);
        }else{
            result = await Notification.find();
        }
        return {
            code: 200,
            message: result
        }
    }
}