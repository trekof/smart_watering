const { createUser, createUserLogin, loginUser, logoutUser, getUsageHistory } = require('../services/user.service');

module.exports = {
    createUser: async (req, res) => {
        let userInfo = req.body.userInfo;
        let data = await createUser(userInfo);
        res.status(data.code).json(data.message);
    },

    createUserLogin: async (req, res) => {
        let userInfo = req.body.userInfo;
        let data = await createUserLogin(userInfo);
        res.status(data.code).json(data.message);
    },

    loginUser: async (req, res) => {
        let userInfo = req.body.userInfo;
        let data = await loginUser(userInfo);
        res.status(data.code).json(data.message);
    },

    logoutUser: async (req, res) => {
        let userInfo = req.body.userInfo;
        let data = await logoutUser(userInfo);
        res.status(data.code).json(data.message);
    },

    getUsageHistory: async (req, res) => {
        const username = req.params.username;
        const result = await getUsageHistory(username);
        res.status(result.code).json(result.message);
    },
};
