let data = {
  eventLoopLag: 0,
  memory: {},
  slowest: []
};

module.exports = {
  update(msg) {
    if (msg.type === "eventLoopLag") data.eventLoopLag = msg.lag;
  },

  updateMemory() {
    data.memory = process.memoryUsage();
  },

  recordAPI(method, url, time) {
    // Super strict check – invalid time ko bilkul push nahi karenge
    if (
      typeof time !== 'number' ||
      isNaN(time) ||
      time <= 0 ||           // 0 ya negative invalid
      time <= 50             // threshold
    ) {
      return;  // kuch record nahi
    }

    data.slowest.push({ method, url, time });
    data.slowest.sort((a, b) => b.time - a.time);
    data.slowest.length = 5;
  },

  snapshot() {
    return JSON.parse(JSON.stringify(data));
  }
};