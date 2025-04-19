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
    }
};
