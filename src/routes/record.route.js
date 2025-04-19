const route = require('express').Router()
const { 
    addARecord, 
    getAllRecord, 
    getAvg7Days, 
    getAvg30Days,
    getAvg7DaysBySensor,
    getAvg30DaysBySensor
} = require('../controllers/record.controller')

route.post('/record', addARecord)
route.get('/record', getAllRecord)
route.get('/record/avg7days', getAvg7Days)
route.get('/record/avg30days', getAvg30Days)
route.get('/record/avg7days/:sensorName', getAvg7DaysBySensor)
route.get('/record/avg30days/:sensorName', getAvg30DaysBySensor)


module.exports = route
