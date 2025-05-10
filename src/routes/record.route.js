const route = require('express').Router()
const { 
    addARecord, 
    getAllRecord, 
    getAvg7Days, 
    getAvg30Days,
    getAvg7DaysBySensor,
    getAvg30DaysBySensor,
    getAvg1YearBySensor,
    getDailyAvg7Days,
} = require('../controllers/record.controller')

route.post('/record', addARecord)
route.get('/record', getAllRecord)
route.get('/record/avg7days', getAvg7Days)
route.get('/record/avg30days', getAvg30Days)
route.get('/record/avg7days/:sensorName', getAvg7DaysBySensor)
route.get('/record/avg30days/:sensorName', getAvg30DaysBySensor)
route.get('/record/avg1year/:sensorName', getAvg1YearBySensor)
route.get('/daily-average/7days', getDailyAvg7Days);


module.exports = route
