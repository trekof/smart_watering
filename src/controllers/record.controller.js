const { 
    addARecord, 
    getAllRecord, 
    getAvg7Days, 
    getAvg30Days,
    getAvg7DaysBySensor,
    getAvg30DaysBySensor
} = require('../services/record.service')

module.exports = {
    addARecord: async (req, res) => {
        let recordInfo = req.body.recordInfo;
        let data = await addARecord(recordInfo);
        res.status(data.code).json(data.message);
    },
    getAllRecord: async (req, res) => {
        let query = req.query;
        let data = await getAllRecord(query);
        res.status(data.code).json(data.message);
    },
    getAvg7Days: async (req, res) => {
        let data = await getAvg7Days();
        res.status(data.code).json(data.message);
    },
    getAvg30Days: async (req, res) => {
        let data = await getAvg30Days();
        res.status(data.code).json(data.message);
    },
    getAvg7DaysBySensor: async (req, res) => {
        const { sensorName } = req.params
        const data = await getAvg7DaysBySensor(sensorName)
        res.status(data.code).json(data.message)
    },
    getAvg30DaysBySensor: async (req, res) => {
        const { sensorName } = req.params
        const data = await getAvg30DaysBySensor(sensorName)
        res.status(data.code).json(data.message)
    }
};
