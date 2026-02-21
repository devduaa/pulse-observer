const { parentPort } = require("worker_threads");

let last = process.hrtime.bigint();

setInterval(() => {
  const now = process.hrtime.bigint();
  const lag = Number(now - last) / 1e6 - 100;

  parentPort.postMessage({
    type: "eventLoopLag",
    lag: Math.max(0, lag.toFixed(2))
  });

  last = now;
}, 100);
