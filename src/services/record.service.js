const Record = require('../models/record.model')

const calculateStats = async (days) => {
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    

    const sensorNames = ['soil', 'humid', 'temperature'];
    const result = {};

    for (let sensor of sensorNames) {
        const records = await Record.find({
            sensorName: sensor,
            createdAt: { $gte: fromDate }
        });

        if (records.length === 0) {
            result[sensor] = { average: null, max: null, min: null };
            continue;
        }

        const values = records.map(r => parseFloat(r.value));
        const average = values.reduce((a, b) => a + b, 0) / values.length;

        let maxRecord = records[0], minRecord = records[0];
        for (let r of records) {
            if (parseFloat(r.value) > parseFloat(maxRecord.value)) maxRecord = r;
            if (parseFloat(r.value) < parseFloat(minRecord.value)) minRecord = r;
        }

        result[sensor] = {
            average: parseFloat(average.toFixed(2)),
            max: { value: parseFloat(maxRecord.value), time: maxRecord.createdAt },
            min: { value: parseFloat(minRecord.value), time: minRecord.createdAt }
        };
    }

    return {
        code: 200,
        message: result
    };
};

const calculateDailyAverages = async () => {
    const sensorNames = ['soil', 'humid', 'temperature'];
    const result = {};

    const now = new Date();
    now.setHours(0, 0, 0, 0); 
    for (let sensor of sensorNames) {
        result[sensor] = [];

        for (let i = 0; i < 7; i++) {
            const from = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const to = new Date(from.getTime() + 24 * 60 * 60 * 1000);

            const records = await Record.find({
                sensorName: sensor,
                createdAt: { $gte: from, $lt: to }
            });

            if (records.length === 0) {
                result[sensor].unshift({
                    date: from.toISOString().slice(0, 10),
                    average: null
                });
                continue;
            }

            const values = records.map(r => parseFloat(r.value));
            const average = values.reduce((a, b) => a + b, 0) / values.length;

            result[sensor].unshift({
                date: from.toISOString().slice(0, 10),
                average: parseFloat(average.toFixed(2))
            });
        }
    }

    return {
        code: 200,
        message: result
    };
};

const calculateMonthlyAverages = async () => {
    const sensorNames = ['soil', 'humid', 'temperature'];
    const result = {};

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startDate = new Date(now.getTime() - 360 * 24 * 60 * 60 * 1000);

    for (let sensor of sensorNames) {
        result[sensor] = [];

        for (let i = 11; i >= 0; i--) {
            const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const nextMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);

            const records = await Record.find({
                sensorName: sensor,
                createdAt: { $gte: monthDate, $lt: nextMonth }
            });

            if (records.length === 0) {
                result[sensor].push({
                    month: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`,
                    average: null
                });
                continue;
            }

            const values = records.map(r => parseFloat(r.value));
            const avg = values.reduce((a, b) => a + b, 0) / values.length;

            result[sensor].push({
                month: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`,
                average: parseFloat(avg.toFixed(2))
            });
        }
    }

    return {
        code: 200,
        message: result
    };
};

const calculateStatsForSensor = async (days, sensor) => {
    const fromDate = new Date(Date.now() - days * 24*60*60*1000)
  
    const records = await Record.find({
      sensorName: sensor,
      createdAt: { $gte: fromDate }
    })
  
    if (records.length === 0) {
      return {
        average: null,
        max: null,
        min: null
      }
    }
  
    const values = records.map(r => parseFloat(r.value))
    const average = values.reduce((a,b) => a+b, 0) / values.length
  
    let maxRec = records[0], minRec = records[0]
    for (let r of records) {
      const v = parseFloat(r.value)
      if (v > parseFloat(maxRec.value)) maxRec = r
      if (v < parseFloat(minRec.value)) minRec = r
    }
  
    return {
      average: parseFloat(average.toFixed(2)),
      max: { value: parseFloat(maxRec.value), time: maxRec.createdAt },
      min: { value: parseFloat(minRec.value), time: minRec.createdAt }
    }
  }

module.exports = {
    addARecord: async (recordInfo) => {
        let record = new Record(recordInfo);
        await record.save();
        return { code: 200, message: recordInfo };
    },
    getAllRecord: async (query) => {
        let result = query
            ? await Record.find().skip(query.offset).limit(query.limit)
            : await Record.find();
        return { code: 200, message: result };
    },
    getAvg7Days: async () => calculateStats(7),
    getAvg30Days: async () => calculateStats(30),
    getAvg7DaysBySensor: async (sensorName) => {
        const stats = await calculateStatsForSensor(7, sensorName)
        return { code: 200, message: stats }
    },
        
    getAvg30DaysBySensor: async (sensorName) => {
        const stats = await calculateStatsForSensor(30, sensorName)
        return { code: 200, message: stats }
    },

    getAvg1YearBySensor: async (sensorName) => {
        const stats = await calculateStatsForSensor(365, sensorName)
        return { code: 200, message: stats }
    },
    getDailyAvg7Days: async () => calculateDailyAverages(),
    getMonthlyAvg1Year: async () => calculateMonthlyAverages(),
};
