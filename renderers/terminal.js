const chalk = require('chalk');

module.exports = metrics => {
  console.clear();
  console.log(chalk.bold.cyan("⚡ Pulse Observer"));

  console.log(chalk.gray("Event Loop Lag:") + " " + 
    (metrics.eventLoopLag > 30 ? chalk.red : chalk.green)(`${metrics.eventLoopLag} ms`));

  console.log(chalk.gray("Heap Used:") + " " + 
    (metrics.memory.heapUsed / 1024 / 1024 > 200 ? chalk.red : chalk.green)(
      `${(metrics.memory.heapUsed / 1024 / 1024).toFixed(1)} MB`
    ));

  console.log("\n" + chalk.bold("Slow APIs (only >50ms):"));

  if (metrics.slowest.length === 0) {
    console.log(chalk.gray("  No slow APIs recorded yet (>50ms)"));
  } else {
    // Temporary cleanup: invalid entries ko filter kar do (test ke liye)
    // Baad mein yeh line remove kar sakta hai jab sab stable ho jaye
    metrics.slowest = metrics.slowest.filter(e => 
      e && typeof e.time === 'number' && !isNaN(e.time) && e.time > 0
    );

    metrics.slowest.forEach(e => {
      // Extra safety (agar filter miss kar de to)
      if (!e || typeof e.time !== 'number' || isNaN(e.time)) {
        console.log(chalk.gray("  Invalid entry skipped"));
        return;
      }

      let color = chalk.green;
      if (e.time > 100) color = chalk.red.bold;
      else if (e.time > 50) color = chalk.yellow;

      console.log(color(
        `${(e.method || '???').padEnd(6)} ${(e.url || 'unknown').padEnd(40)} → ${e.time.toFixed(1).padStart(6)}ms`
      ));
    });
  }
};