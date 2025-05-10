const User = require('../models/user.model');
const Userlogin = require('../models/userlogin.model');

module.exports = {
    createUser: async (userInfo) => {
        try {
            const existingUser = await User.find({ username: userInfo.username }).exec();
            if (existingUser.length > 0) {
                return {
                    code: 200,
                    message: `Username ${userInfo.username} is already taken`
                };
            }
    
            if (userInfo.password.length === 0) {
                return {
                    code: 400,
                    message: 'Password cannot be empty'
                };
            }

            let user = new User(userInfo);
            await user.save();
    
            return {
                code: 200,
                message: 'User created successfully'
            };
        } catch (err) {
            return {
                code: 500,
                message: 'Server error'
            };
        }
    },

    createUserLogin: async (userInfo) => {
        let userLog = new Userlogin(userInfo);
        try {
            const data = await User.find({ username: userInfo.username }).exec();
            if (data.length === 0) {
                if (userInfo.password.length !== 0) {
                    await userLog.save();
                    const user = new User({
                    username: userInfo.username,
                    password: userInfo.password,
                    loginHistory: [{
                        time: new Date(),
                        action: 'register'
                    }]
                });
                await user.save();
                    return {
                        code: 200,
                        message: "Register successful"
                    };
                } else {
                    return {
                        code: 200,
                        message: 'Wrong type password'
                    };
                }
            } else {
                return {
                    code: 200,
                    message: `Username ${userInfo.username} is already taken`
                };
            }
        } catch (err) {
            return {
                code: 500,
                message: 'Server error'
            };
        }
    },

    loginUser: async (userInfo) => {
        try {
            const data = await User.find({ username: userInfo.username }).exec();
            if (data.length === 0) {
                return {
                    code: 200,
                    message: 'Login failed'
                };
            } else {
                if (data[0].password === userInfo.password) {
                    const user = await User.findOne({ username: userInfo.username });
                    user.loginHistory.push({
                        time: new Date(),
                        status: 'login'
                    });
                    await user.save();

                    return {
                        code: 200,
                        message: 'Login successful'
                    };
                } else {
                    return {
                        code: 200,
                        message: 'Login failed'
                    };
                }
            }
        } catch (err) {
            return {
                code: 500,
                message: 'Server error'
            };
        }
    },

    logoutUser: async (userInfo) => {
        try {
            const user = await User.findOne({ username: userInfo.username });
            if (user) {
                user.loginHistory.push({
                    time: new Date(),
                    status: 'logout'
                });
                await user.save();

                return {
                    code: 200,
                    message: 'Logout successful'
                };
            } else {
                return {
                    code: 200,
                    message: 'User not found'
                };
            }
        } catch (err) {
            return {
                code: 500,
                message: 'Server error'
            };
        }
    },

    getUsageHistory: async (userId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return {
                    code: 404,
                    message: 'User not found'
                };
            }

            return {
                code: 200,  
                message: user.loginHistory
            };
        } catch (error) {
            console.error('Error in service:', error);
            return {
                code: 500,
                message: 'Internal server error'
            };
        }
    },
};
