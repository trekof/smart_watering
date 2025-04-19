const cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log(`[${new Date().toLocaleTimeString()}] Starting 6 tasks with 10s interval:`);

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const time = new Date().toLocaleTimeString();
      console.log(`  [${time}] Task ${i + 1}`);
    }, i * 1000);
  }
});
